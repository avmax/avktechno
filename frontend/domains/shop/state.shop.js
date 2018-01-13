// import { NOTIFICATION_OPEN } from '~/domains/barrel.state';

import {
  ENTITY_TYPES,
  // NOTIFICATION_TYPES,
} from '~/domains/barrel.types';

import {
  ApiShop,
} from '~/domains/barrel.api';

import Vue from 'vue';
import { assign, isEmpty } from 'lodash/fp';


const ENTITY_LOAD = type => `shop: загрузить сущности типа <${type}>`;
const ENTITY_ADD = type => `shop: добавить сущность типа <${type}>`;
const ENTITY_EDIT = type => `shop: изменить сущность типа <${type}>`;
const ENTITY_REMOVE = type => `shop: удалить сущность типа <${type}>`;


const state = entityTypes => () => {
  const s = { };
  Object.values(entityTypes).forEach(val => s[val] = {});
  return s;
};

const getters = () => {
  const g = {
    entity: state => (type, id) => state[type][id],
    entities: state => type => Object.keys(state[type]).map(key => +key),
  };

  return g;
};

const mutations = (entitiyTypes) => {
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

  const m = { };

  Object.values(entitiyTypes).forEach((val) => {
    m[ENTITY_ADD(val)] = addEntity(val);
    m[ENTITY_EDIT(val)] = editEntity(val);
    m[ENTITY_REMOVE(val)] = removeEntity(val);
  });

  return m;
};

const actions = (entityTypes) => {
  const loadEntities = function(key, val) {
    return async ({ state, commit }) => {
      if (!isEmpty(state[val])) { return state[val]; }
      try {
        const { data } = await ApiShop[key].get();
        if (data) {
          data.forEach(dataItem => commit(ENTITY_ADD(val), dataItem));
        }
        return Promise.resolve(data);
      } catch (err) {
        console.log('err', err);
        return Promise.reject(err && err.message);
      }
    };
  };

  const a = {
    // nuxtServerInit({ dispatch }) {
    //   return Promise.all(Object.values(entityTypes).map(v => dispatch(ENTITY_LOAD(v))));
    // },
    [ENTITY_LOAD()]({ dispatch }) {
      return Object.values(entityTypes).forEach(v => dispatch(ENTITY_LOAD(v)));
    },
  };

  Object.keys(entityTypes).forEach((key) => {
    const val = entityTypes[key];
    a[ENTITY_LOAD(val)] = loadEntities(key, val);
  });

  return a;
};

const module = {
  state: state(ENTITY_TYPES),
  mutations: mutations(ENTITY_TYPES),
  actions: actions(ENTITY_TYPES),
  getters: getters(),
};

export {
  module,

  ENTITY_LOAD,
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,
};
