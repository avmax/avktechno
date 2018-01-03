import Vue from 'vue';
import { assign, isEmpty } from 'lodash/fp';
import api from './shop.api';

const START_EDITION = 'начать редактирование магазина';
const STOP_EDITION = 'прекратить редактирование магазина';
const SAVE_EDITION = type => `сохранить изменения <${type}>`;
const ADD_ENTITY = type => `добавить сущность типа <${type}>`;
const EDIT_ENTITY = type => `изменить сущность типа <${type}>`;
const REMOVE_ENTITY = type => `удалить сущность типа <${type}>`;
const CREATE_ENTITY = type => `создать сущность типа <${type}>`;


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
    edition.backup = payload.entity ? assign({}, payload.entity) : null;
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
      Vue.delete(state[type], id);
    };
  };

  const m = {
    [START_EDITION]: startEdition,
    [STOP_EDITION]: stopEdition,
  };

  Object.values(entitiyTypes).forEach((val) => {
    m[ADD_ENTITY(val)] = addEntity(val);
    m[EDIT_ENTITY(val)] = editEntity(val);
    m[REMOVE_ENTITY(val)] = removeEntity(val);
  });

  return m;
};

const actions = (entitiyTypes) => {
  const addEntity = function(key, val) {
    return (context, payload = {}) => {
      const { commit } = context;
      commit(START_EDITION, {
        entityType: val,
        editionType: EDITION_TYPES.create,
        entity: payload,
      });
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
        commit(REMOVE_ENTITY(val), id);
      } catch (err) {
        console.log(REMOVE_ENTITY(key), err);
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
          const { refs } = data;
          edition.backup = null;
          commit(ADD_ENTITY(val), data);

          if (!isEmpty(refs)) {
            Object.keys(refs).forEach((k) => {
              refs[k].forEach((v) => {
                const ref = { ...state[k][v] };
                ref.refs[key].push(data.id);
                commit(EDIT_ENTITY(k), ref);
              });
            });
          }
        } catch (err) {
          console.log(SAVE_EDITION(val), err);
          throw err;
        }
      } else {
        try {
          api[key].put(entity);
          edition.backup = null;
        } catch (err) {
          console.log(SAVE_EDITION(val), err);
          throw err;
        }
      }
    };
  };

  const a = { };

  Object.keys(entitiyTypes).forEach((key) => {
    const val = entitiyTypes[key];
    a[ADD_ENTITY(val)] = addEntity(key, val);
    a[EDIT_ENTITY(val)] = editEntity(key, val);
    a[REMOVE_ENTITY(val)] = removeEntity(key, val);
    a[SAVE_EDITION(val)] = saveEdition(key, val);
  });

  return a;
};

const shopEditionStoreModule = { state, mutations, actions };

export {
  shopEditionStoreModule,
  EDITION_TYPES,
  SAVE_EDITION,
  STOP_EDITION,
  ADD_ENTITY,
  EDIT_ENTITY,
  REMOVE_ENTITY,
  CREATE_ENTITY,
};
