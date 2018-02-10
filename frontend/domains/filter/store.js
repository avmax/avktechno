import { intersection } from 'lodash/fp';

const FILTER_MULTIPLE_SET = (entityType, filterType) => `filter: засетить <${entityType}> по признаку <${filterType}>`;

const types = ['category', 'brand', 'product'];
const queryKeys = ['name', 'identificator'];

const state = () => {
  const s = { };

  types.forEach(key => s[key] = {});
  queryKeys.forEach(key => s.product[key] = []);

  return s;
};

const mutations = () => {
  const setMultiple = function(entityType, filterType) {
    return (state, payload) => {
      state[entityType][filterType] = payload;
    };
  };

  const m = { };

  queryKeys.forEach((key) => {
    m[FILTER_MULTIPLE_SET('product', key)] = setMultiple('product', key);
  });

  return m;
};

const getters = () => {
  const g = {};

  types.forEach(type => g[`${type}-filtered`] = state => intersection(Object.values(state[type])));

  return g;
};

const moduleFactory = () => ({
  state: state(),
  getters: getters(),
  mutations: mutations(),
});

const module = moduleFactory();

export {
  module,

  FILTER_MULTIPLE_SET,
};
