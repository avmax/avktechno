import {
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,

  FILTER_ENTITY_AVAILABLE_ADD,
  FILTER_ENTITY_AVAILABLE_REMOVE,
} from '~/domains/barrel.state';
import {
  EDITION_TYPES,
  ENTITY_TYPES,
} from '~/domains/barrel.types';
import {
  ApiShop,
} from '~/domains/barrel.api';

import { difference, cloneDeep } from 'lodash/fp';
import { refsEqualIs } from './utils.edition';


const EDITION_START = 'edition: начать редактирование магазина';
const EDITION_STOP = 'edition: прекратить редактирование магазина';
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
  const editionStart = (state, payload) => {
    state.isEnabled = true;
    state.editionType = payload.editionType;
    state.entityType = payload.entityType;
    state.value = payload.entity || {};
    state.backup = payload.entity && payload.entity.id ? cloneDeep(payload.entity) : null;
  };

  const editionStop = (state) => {
    state.isEnabled = false;
    state.editionType = null;
    state.entityType = null;
    state.value = null;
    state.backup = null;
  };

  const m = {
    [EDITION_START]: editionStart,
    [EDITION_STOP]: editionStop,
  };

  return m;
};

const actions = (entitiyTypes) => {
  const editionAdd = function(key, val) {
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

  const editionEdit = function(key, val) {
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

  const editionRemove = function(key, val) {
    return async (context, id) => {
      const { commit } = context;
      try {
        await ApiShop[key].delete(id);
        commit(ENTITY_REMOVE(val), id);
        commit(FILTER_ENTITY_AVAILABLE_REMOVE(val), id);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    };
  };

  const editionStop = (context) => {
    const { state, commit } = context;
    if (state.backup) { commit(ENTITY_EDIT(state.entityType), state.backup); }
    commit(EDITION_STOP);
  };

  const editionSave = function(key, val) {
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
                const ref = cloneDeep(rootState.shop[k][v]);
                ref.refs[val].push(data.id);
                commit(ENTITY_EDIT(k), ref);
              });
            });
          }

          commit(FILTER_ENTITY_AVAILABLE_ADD(val), { id: data.id, name: data.name });
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
                const ref = cloneDeep(rootState.shop[k][v]);
                if (ref) {
                  ref.refs[val].push(entity.id);
                  commit(ENTITY_EDIT(k), ref);
                }
              });

              toBePulled.forEach((v) => {
                const ref = cloneDeep(rootState.shop[k][v]);
                if (ref) {
                  ref.refs[val].splice(ref.refs[val].indexOf(entity.id), 1);
                  commit(ENTITY_EDIT(k), ref);
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
    [EDITION_STOP]: editionStop,
  };

  Object.keys(entitiyTypes).forEach((key) => {
    const val = entitiyTypes[key];
    a[EDITION_ADD(val)] = editionAdd(key, val);
    a[EDITION_EDIT(val)] = editionEdit(key, val);
    a[EDITION_REMOVE(val)] = editionRemove(key, val);
    a[EDITION_SAVE(val)] = editionSave(key, val);
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
