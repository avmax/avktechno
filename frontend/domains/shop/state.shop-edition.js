import Vue from 'vue';
import { assign, difference } from 'lodash/fp';
import api from './api.shop';
import { refsEqualIs } from './state.utils';

const START_EDITION = 'начать редактирование магазина';
const EDITION_STOP = 'прекратить редактирование магазина';
const EDITION_SAVE = type => `сохранить изменения <${type}>`;
const ENTITY_ADD = type => `добавить сущность типа <${type}>`;
const ENTITY_EDIT = type => `изменить сущность типа <${type}>`;
const ENTITY_REMOVE = type => `удалить сущность типа <${type}>`;
const ENTITY_CREATE = type => `создать сущность типа <${type}>`;


const EDITION_TYPES = {
  edit: 'редактировать',
  create: 'создать',
};


const state = () => ({
  edition: {
    isEnabled: false,
    editionType: null,
    entityType: null,
    value: null,
    backup: null,
  },
});

const mutations = (entitiyTypes) => {
  const startEdition = (state, payload) => {
    const { edition } = state;
    edition.isEnabled = true;
    edition.editionType = payload.editionType;
    edition.entityType = payload.entityType;
    edition.value = payload.entity || {};
    edition.backup = payload.entity && payload.entity.id ? assign({}, payload.entity) : null;
  };

  const stopEdition = (state) => {
    const { edition } = state;

    if (edition.backup) {
      state[edition.entityType][edition.backup.id] = edition.backup;
    }

    edition.isEnabled = false;
    edition.editionType = null;
    edition.entityType = null;
    edition.value = null;
    edition.backup = null;
  };

  const addEntity = function(type) {
    return (state, payload) => {
      Vue.set(state[type], payload.id, payload);
    };
  };

  const editEntity = function(type) {
    return (state, payload) => {
      if (state[type][payload.id]) {
        state[type][payload.id] = assign({}, payload);
      }
    };
  };

  const removeEntity = function(type) {
    return (state, id) => {
      const { refs } = state[type][id];
      Object.keys(refs).forEach((key) => {
        refs[key].forEach((i) => {
          const ref = state[key][i];
          if (ref && ref.refs) {
            ref.refs[type].splice(ref.refs[type].indexOf(id), 1);
          }
        });
      });
      Vue.delete(state[type], id);
    };
  };

  const m = {
    [START_EDITION]: startEdition,
    [EDITION_STOP]: stopEdition,
  };

  Object.values(entitiyTypes).forEach((val) => {
    m[ENTITY_ADD(val)] = addEntity(val);
    m[ENTITY_EDIT(val)] = editEntity(val);
    m[ENTITY_REMOVE(val)] = removeEntity(val);
  });

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

      commit(START_EDITION, p);
    };
  };

  const editEntity = function(key, val) {
    return (context, id) => {
      const { state, commit } = context;
      const entity = state[val][id];
      commit(
        START_EDITION,
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
        await api[key].delete(id);
        commit(ENTITY_REMOVE(val), id);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    };
  };

  const saveEdition = function(key, val) {
    return async (context, entity) => {
      const { state, commit } = context;
      const { edition } = state;


      if (edition.editionType === EDITION_TYPES.create) {
        try {
          const { data } = await api[key].post(entity);
          if (data) {
            const { refs } = data;
            edition.backup = null;
            commit(ENTITY_ADD(val), data);

            Object.keys(refs).forEach((k) => {
              refs[k].forEach((v) => {
                const ref = { ...state[k][v] };
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
          await api[key].put(entity);

          const { refs: refsNew } = entity;
          const { refs: refsOld } = state.edition.backup;

          if (!refsEqualIs(refsOld, refsNew)) {
            Object.keys(refsNew).forEach((k) => {
              const n = refsNew[k];
              const o = refsOld[k];
              const toBeInserted = difference(n, o);
              const toBePulled = difference(o, n);
              toBeInserted.forEach((v) => {
                const ref = state[k][v];
                if (ref) {
                  ref.refs[val].push(entity.id);
                }
              });
              toBePulled.forEach((v) => {
                const ref = state[k][v];
                if (ref) {
                  ref.refs[val].splice(ref.refs[val].indexOf(entity.id), 1);
                }
              });
            });
          }

          edition.backup = null;
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
      }
    };
  };

  const a = { };

  Object.keys(entitiyTypes).forEach((key) => {
    const val = entitiyTypes[key];
    a[ENTITY_ADD(val)] = addEntity(key, val);
    a[ENTITY_EDIT(val)] = editEntity(key, val);
    a[ENTITY_REMOVE(val)] = removeEntity(key, val);
    a[EDITION_SAVE(val)] = saveEdition(key, val);
  });

  return a;
};

const shopEditionStoreModule = { state, mutations, actions };

export {
  shopEditionStoreModule,
  EDITION_TYPES,
  EDITION_SAVE,
  EDITION_STOP,
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,
  ENTITY_CREATE,
};
