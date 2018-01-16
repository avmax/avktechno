import {
  ENTITY_TYPES,
} from '~/domains/barrel.types';

import {
  ApiShop,
} from '~/domains/barrel.api';

import Vue from 'vue';
import { assign, isEmpty } from 'lodash/fp';


const ENTITY_ALL_LOAD = type => `shop: загрузить сущности типа <${type}>`;
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
    entities: state => type => Object.keys(state[type]).map(id => +id),
  };

  return g;
};

const mutations = (entitiyTypes) => {
  const entityAdd = function(type) {
    return (state, payload) => {
      Vue.set(state[type], payload.id, payload);
    };
  };

  const entityEdit = function(type) {
    return (state, payload) => {
      if (state[type][payload.id]) {
        state[type][payload.id] = assign({}, payload);
      }
    };
  };

  const entityRemove = function(type) {
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
    m[ENTITY_ADD(val)] = entityAdd(val);
    m[ENTITY_EDIT(val)] = entityEdit(val);
    m[ENTITY_REMOVE(val)] = entityRemove(val);
  });

  return m;
};

const actions = (entityTypes) => {
  const entityLoadAll = function(key, val) {
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
    [ENTITY_ALL_LOAD()]({ dispatch }) {
      return Object.values(entityTypes).forEach(v => dispatch(ENTITY_ALL_LOAD(v)));
    },
  };

  if (process.env.isProd) {
    // eslint-disable-next-line
    a.nuxtServerInit = ({ dispatch }) => Promise.all(Object.values(entityTypes).map(v => dispatch(ENTITY_ALL_LOAD(v))));
  }

  Object.keys(entityTypes).forEach((key) => {
    const val = entityTypes[key];
    a[ENTITY_ALL_LOAD(val)] = entityLoadAll(key, val);
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

  ENTITY_ALL_LOAD,
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,
};
