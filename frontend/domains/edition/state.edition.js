import {
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,
} from '~/domains/barrel.state';
import {
  EDITION_TYPES,
  ENTITY_TYPES,
} from '~/domains/barrel.types';
import {
  ApiShop,
} from '~/domains/barrel.api';

import { assign, difference } from 'lodash/fp';
import { refsEqualIs } from './utils.edition';


const EDITION_START = 'начать редактирование магазина';
const EDITION_STOP = 'прекратить редактирование магазина';
const EDITION_ADD = type => `edition: создать сущность типа <${type}>`;
const EDITION_EDIT = type => `edition: изменить сущность типа <${type}>`;
const EDITION_REMOVE = type => `edition: удалить сущность типа <${type}>`;
const EDITION_SAVE = type => `edition: сохранить изменения <${type}>`;


const state = () => () => ({
  isEnabled: false,
  editionType: null,
  entityType: null,
  value: null,
  backup: null,
});

const mutations = () => {
  const startEdition = (state, payload) => {
    state.isEnabled = true;
    state.editionType = payload.editionType;
    state.entityType = payload.entityType;
    state.value = payload.entity || {};
    state.backup = payload.entity && payload.entity.id ? assign({}, payload.entity) : null;
  };

  const stopEdition = (state) => {
    state.isEnabled = false;
    state.editionType = null;
    state.entityType = null;
    state.value = null;
    state.backup = null;
  };

  const m = {
    [EDITION_START]: startEdition,
    [EDITION_STOP]: stopEdition,
  };

  return m;
};

const actions = (entitiyTypes) => {
  const addEntity = function(key, val) {
    return (context, payload) => {
      const { commit } = context;
      const p = {
        entityType: val,
        editionType: EDITION_TYPES.create,
      };

      if (payload) {
        const refs = { };
        const key = Object.keys(payload)[0];
        refs[key] = [payload[key]];
        p.entity = { refs };
      }

      commit(EDITION_START, p);
    };
  };

  const editEntity = function(key, val) {
    return (context, id) => {
      const { rootState, commit } = context;
      const entity = rootState.shop[val][id];
      commit(
        EDITION_START,
        {
          entityType: val,
          editionType: EDITION_TYPES.edit,
          entity: entity,
        },
      );
    };
  };

  const removeEntity = function(key, val) {
    return async (context, id) => {
      const { commit } = context;
      try {
        await ApiShop[key].delete(id);
        commit(ENTITY_REMOVE(val), id);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    };
  };

  const stopEdition = (context) => {
    const { state, commit } = context;
    if (state.backup) { commit(ENTITY_EDIT(state.entityType), state.backup); }
    commit(EDITION_STOP);
  };

  const saveEdition = function(key, val) {
    return async (context, entity) => {
      const { state, rootState, commit } = context;


      if (state.editionType === EDITION_TYPES.create) {
        try {
          const { data } = await ApiShop[key].post(entity);
          if (data) {
            const { refs } = data;

            commit(EDITION_STOP);
            commit(ENTITY_ADD(val), data);

            Object.keys(refs).forEach((k) => {
              refs[k].forEach((v) => {
                const ref = rootState.shop[k][v];
                ref.refs[val].push(data.id);
                commit(ENTITY_EDIT(k), ref);
              });
            });
          }
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
      } else {
        try {
          await ApiShop[key].put(entity);

          const { refs: refsNew } = entity;
          const { refs: refsOld } = state.backup;

          if (!refsEqualIs(refsOld, refsNew)) {
            Object.keys(refsNew).forEach((k) => {
              const n = refsNew[k];
              const o = refsOld[k];
              const toBeInserted = difference(n, o);
              const toBePulled = difference(o, n);
              toBeInserted.forEach((v) => {
                const ref = rootState.shop[k][v];
                if (ref) {
                  ref.refs[val].push(entity.id);
                }
              });

              toBePulled.forEach((v) => {
                const ref = rootState.shop[k][v];
                if (ref) {
                  ref.refs[val].splice(ref.refs[val].indexOf(entity.id), 1);
                }
              });
            });
          }

          commit(EDITION_STOP);
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
      }
    };
  };

  const a = {
    [EDITION_STOP]: stopEdition,
  };

  Object.keys(entitiyTypes).forEach((key) => {
    const val = entitiyTypes[key];
    a[EDITION_ADD(val)] = addEntity(key, val);
    a[EDITION_EDIT(val)] = editEntity(key, val);
    a[EDITION_REMOVE(val)] = removeEntity(key, val);
    a[EDITION_SAVE(val)] = saveEdition(key, val);
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

  EDITION_ADD,
  EDITION_REMOVE,
  EDITION_EDIT,
  EDITION_SAVE,
  EDITION_STOP,
};
