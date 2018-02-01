import {
  ENTITY_TYPES,
} from '~/barrel/types';

import {
  apiShop,
} from '~/barrel/api';

import Vue from 'vue';
import { assign, isEmpty } from 'lodash/fp';


const ENTITY_ALL_LOAD = type => `shop: загрузить сущности типа <${type}>`;
const ENTITY_ADD = type => `shop: добавить сущность типа <${type}>`;
const ENTITY_MULTIPLE_ADD = type => `shop: добавить несколько сущностей типа <${type}>`;
const ENTITY_EDIT = type => `shop: заменить сущность типа <${type}>`;
const ENTITY_REMOVE = type => `shop: удалить сущность типа <${type}>`;


const state = entityTypes => () => {
  const s = { };
  Object.values(entityTypes).forEach(type => s[type] = {});
  return s;
};

const getters = () => {
  const g = {
    entity: state => (type, id) => state[type][id],
    entities: state => type => Object.values(state[type]),
    product: state => id => state[ENTITY_TYPES.product][id],
    products: state => Object.values(state[ENTITY_TYPES.product]),
    category: state => id => state[ENTITY_TYPES.category][id],
    categories: state => Object.values(state[ENTITY_TYPES.category]),
    brand: state => id => state[ENTITY_TYPES.brand][id],
    brands: state => Object.values(state[ENTITY_TYPES.brand]),
  };

  return g;
};

const mutations = (entitiyTypes) => {
  const entityAdd = function(type) {
    return (state, payload) => {
      Vue.set(state[type], payload.id, payload);
    };
  };

  const entityMultipleAdd = function(type) {
    return (state, payload) => {
      payload.forEach((item) => {
        Vue.set(state[type], item.id, item);
      });
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

  Object.values(entitiyTypes).forEach((type) => {
    m[ENTITY_ADD(type)] = entityAdd(type);
    m[ENTITY_MULTIPLE_ADD(type)] = entityMultipleAdd(type);
    m[ENTITY_EDIT(type)] = entityEdit(type);
    m[ENTITY_REMOVE(type)] = entityRemove(type);
  });

  return m;
};

const actions = (entityTypes) => {
  const entityLoadAll = function(type) {
    return async ({ state, commit }) => {
      if (!isEmpty(state[type])) { return state[type]; }
      try {
        const { data } = await apiShop[type].get();
        if (data) {
          commit(ENTITY_MULTIPLE_ADD(type), data);
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
      return Promise.all(Object.values(entityTypes).map(v => dispatch(ENTITY_ALL_LOAD(v))));
    },
  };

  if (process.env.isProd) {
    // eslint-disable-next-line
    a.nuxtServerInit = ({ dispatch }) => Promise.all(Object.values(entityTypes).map(v => dispatch(ENTITY_ALL_LOAD(v))));
  }

  Object.values(entityTypes).forEach((type) => {
    a[ENTITY_ALL_LOAD(type)] = entityLoadAll(type);
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
