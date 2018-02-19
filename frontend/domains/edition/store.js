import {
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,
} from '~/barrel/state';
import {
  EDITION_TYPES,
  ENTITY_TYPES,
} from '~/barrel/types';
import {
  apiShop,
} from '~/barrel/api';

import { difference, cloneDeep } from 'lodash/fp';
import { toFormData } from './utils';


const EDITION_START_EDITION = type => `edition: начать редактирование сущности типа <${type}>`;
const EDITION_START_CREATION = type => `edition: начать создание сущности типа <${type}>`;
const EDITION_STOP = 'edition: прекратить редактирование магазина';
const EDITION_CREATE = type => `edition: создать сущность типа <${type}>`;
const EDITION_EDIT = type => `edition: изменить сущность типа <${type}>`;
const EDITION_REMOVE = type => `edition: удалить сущность типа <${type}>`;
const EDITION_SAVE = type => `edition: сохранить изменения <${type}>`;


const state = () => () => ({
  isActive: false,
  editionType: null,
  entityType: null,
  value: null,
  backup: null,
});

const mutations = (entitiyTypes) => {
  const startCreation = function(type) {
    return (state, payload) => {
      const entity = payload || {};

      state.isActive = true;
      state.editionType = EDITION_TYPES.create;
      state.entityType = type;
      state.value = entity;
    };
  };

  const startEdition = function(type) {
    return (state, payload) => {
      const entity = payload;
      state.isActive = true;
      state.editionType = EDITION_TYPES.edit;
      state.entityType = type;
      state.value = entity;
      state.backup = cloneDeep(entity);
    };
  };

  const stop = (state) => {
    state.isActive = false;
    state.editionType = null;
    state.entityType = null;
    state.value = null;
    state.backup = null;
  };

  const m = {
    [EDITION_STOP]: stop,
  };

  Object.values(entitiyTypes).forEach((type) => {
    m[EDITION_START_CREATION(type)] = startCreation(type);
    m[EDITION_START_EDITION(type)] = startEdition(type);
  });

  return m;
};

const actions = (entitiyTypes) => {
  const remove = function(type) {
    return async (context, payload) => {
      const id = payload;
      const { commit } = context;
      try {
        await apiShop[type].delete(id);
        commit(ENTITY_REMOVE(type), id);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    };
  };

  const stop = (context) => {
    const { state, commit } = context;
    if (state.backup) {
      const type = state.entityType;
      commit(ENTITY_EDIT(type), state.backup);
    }
    commit(EDITION_STOP);
  };

  const create = function(type) {
    return async (context, payload) => {
      const entity = payload;
      const { rootState, commit } = context;
      try {
        const { data } = await apiShop[type].post(toFormData(entity));
        const { refs } = data;

        commit(EDITION_STOP);
        commit(ENTITY_ADD(type), data);

        if (!refs) { return; }

        Object.keys(refs).forEach((k) => {
          if (type === 'product' && k === 'brand') {
            return;
          }

          refs[k].forEach((v) => {
            const ref = cloneDeep(rootState.shop[k][v]);
            ref.refs[type].push(data.id);
            commit(ENTITY_EDIT(k), ref);
          });
        });
      } catch (err) {
        console.dir(err);
        return Promise.reject(err);
      }
    };
  };

  const edit = function(type) {
    return async (context, payload) => {
      const entity = payload;
      const { state, rootState, commit } = context;

      try {
        const { data } = await apiShop[type].put(toFormData(entity));

        const { refs: refsNew } = entity;
        const { refs: refsOld } = state.backup;

        commit(ENTITY_EDIT(type), data);

        if (!refsNew || !refsOld) { return; }

        Object.keys(refsNew).forEach((k) => {
          if (type === 'product' && k === 'brand') {
            return;
          }

          const n = refsNew[k];
          const o = refsOld[k];
          const toBeInserted = difference(n, o);
          const toBePulled = difference(o, n);

          toBeInserted.forEach((v) => {
            const ref = cloneDeep(rootState.shop[k][v]);
            if (ref) {
              ref.refs[type].push(entity.id);
              commit(ENTITY_EDIT(k), ref);
            }
          });

          toBePulled.forEach((v) => {
            const ref = cloneDeep(rootState.shop[k][v]);
            if (ref) {
              ref.refs[type].splice(ref.refs[type].indexOf(entity.id), 1);
              commit(ENTITY_EDIT(k), ref);
            }
          });
        });

        commit(EDITION_STOP);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    };
  };

  const save = function(type) {
    return async (context, payload) => {
      const entity = payload;
      const { state, dispatch } = context;
      const { editionType } = state;
      let action;

      if (editionType === EDITION_TYPES.create) {
        action = EDITION_CREATE(type);
      } else {
        action = EDITION_EDIT(type);
      }

      return dispatch(action, entity);
    };
  };

  const a = {
    [EDITION_STOP]: stop,
  };

  Object.values(entitiyTypes).forEach((type) => {
    a[EDITION_CREATE(type)] = create(type);
    a[EDITION_EDIT(type)] = edit(type);
    a[EDITION_REMOVE(type)] = remove(type);
    a[EDITION_SAVE(type)] = save(type);
  });

  return a;
};


const module = {
  state: state(),
  mutations: mutations(ENTITY_TYPES),
  actions: actions(ENTITY_TYPES),
};

export {
  module,

  EDITION_START_CREATION,
  EDITION_START_EDITION,
  EDITION_REMOVE,
  EDITION_SAVE,
  EDITION_STOP,
};
