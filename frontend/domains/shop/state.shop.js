import {
  NOTIFICATION_TYPES,
  NOTIFICATION_OPEN,
  NOTIFICATION_CLOSE,
  NOTIFICATION_LAST_CLOSE,
} from '~/domains/common/state.notification';

import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
} from '~/domains/user/state.user';

import {
  shopEditionStoreModule,
  EDITION_TYPES,
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,
  ENTITY_CREATE,
  EDITION_SAVE,
  EDITION_STOP,
} from './state.shop-edition';

import api from './api.shop';
// eslint-disable-next-line
import isEmpty from 'lodash/fp/isEmpty';


const ENTITY_LOAD = type => `загрузить сущности типа <${type}>`;


const state = (entityTypes) => {
  const s = { ...shopEditionStoreModule.state() };
  Object.values(entityTypes).forEach(val => s[val] = {});
  return s;
};

const getters = () => {
  const g = {
    entity: state => (type, id) => state[type][id],
    entities: state => type => Object.keys(state[type]),
  };

  return g;
};

const mutations = (entityTypes) => {
  const m = { ...shopEditionStoreModule.mutations(entityTypes) };
  return m;
};

const actions = (entityTypes) => {
  const loadEntities = function(key, val) {
    return async ({ state, commit }) => {
      if (!isEmpty(state[val])) { return state[val]; }
      try {
        const { data } = await api[key].get();
        if (data) {
          data.forEach(dataItem => commit(ENTITY_ADD(val), dataItem));
        }
      } catch (err) {
        commit(NOTIFICATION_OPEN, { message: `${ENTITY_LOAD(val)}: ${err.message}`, type: NOTIFICATION_TYPES.warning });
        return Promise.reject(err.message);
      }
    };
  };

  const a = {
    ...shopEditionStoreModule.actions(entityTypes),
    [ENTITY_LOAD()]: ({ dispatch }) => {
      Object.values(entityTypes).forEach(v => dispatch(ENTITY_LOAD(v)));
    },
  };

  Object.keys(entityTypes).forEach((key) => {
    const val = entityTypes[key];
    a[ENTITY_LOAD(val)] = loadEntities(key, val);
  });

  return a;
};


const ENTITY_TYPES = {
  category: 'category',
  brand: 'brand',
  product: 'product',
};

const module = {
  state: state(ENTITY_TYPES),
  mutations: mutations(ENTITY_TYPES),
  actions: actions(ENTITY_TYPES),
  getters: getters(),
};

export {
  module,
  ENTITY_TYPES,
  EDITION_TYPES,
  NOTIFICATION_TYPES,

  ENTITY_LOAD,
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,
  ENTITY_CREATE,
  EDITION_SAVE,
  EDITION_STOP,

  NOTIFICATION_OPEN,
  NOTIFICATION_CLOSE,
  NOTIFICATION_LAST_CLOSE,

  USER_SIGN_IN,
  USER_SIGN_OUT,
};
