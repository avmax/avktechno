import isEmpty from 'lodash/fp/isEmpty';
import api from './shop.api';

import {
  shopEditionStoreModule,
  EDITION_TYPES,
  ADD_ENTITY,
  EDIT_ENTITY,
  REMOVE_ENTITY,
  CREATE_ENTITY,
  SAVE_EDITION,
  STOP_EDITION,
} from './shop-edition.state';


const LOAD_ENTITIES = type => `загрузить сущности типа ${type}`;


const state = (entityTypes) => {
  const s = { ...shopEditionStoreModule.state() };
  Object.values(entityTypes).forEach(val => s[val] = {});
  return s;
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
        data.forEach(dataItem => commit(ADD_ENTITY(val), dataItem));
        return data;
      } catch (err) {
        console.log(LOAD_ENTITIES(val), err);
        return err;
      }
    };
  };

  const a = { ...shopEditionStoreModule.actions(entityTypes) };

  Object.keys(entityTypes).forEach((key) => {
    const val = entityTypes[key];
    a[LOAD_ENTITIES(val)] = loadEntities(key, val);
  });

  return a;
};


const ENTITY_TYPES = {
  category: 'category',
  brand: 'brand',
};

const module = {
  state: state(ENTITY_TYPES),
  mutations: mutations(ENTITY_TYPES),
  actions: actions(ENTITY_TYPES),
};

export {
  module,
  ENTITY_TYPES,
  EDITION_TYPES,
  LOAD_ENTITIES,
  ADD_ENTITY,
  EDIT_ENTITY,
  REMOVE_ENTITY,
  CREATE_ENTITY,
  SAVE_EDITION,
  STOP_EDITION,
};
