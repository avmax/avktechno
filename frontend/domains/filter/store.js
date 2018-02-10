const FILTER_BY_STRING_FILTER = queryKey => `filter: сортировать по ключу <${queryKey}>`;
const FILTER_SUITABLE_SET = queryKey => `filter: засетить доступные по ключу <${queryKey}>`;

const state = ({ queryKeys }) => {
  const s = { };

  queryKeys.forEach(key => s[key] = []);

  return s;
};

const mutations = ({ queryKeys }) => {
  const suitableSet = function(queryKey) {
    return (state, payload) => {
      state[queryKey] = payload;
    };
  };

  const m = { };

  queryKeys.forEach(key => m[FILTER_SUITABLE_SET(key)] = suitableSet(key));

  return m;
};

const actions = ({ queryKeys }) => {
  const byKey = function(queryKey) {
    return (context, payload) => {
      const { commit, getters } = context;
      const target = payload;
      const products = getters.products;

      const suitable = products.filter(p => p[queryKey].indexOf(target) !== -1);
      commit(FILTER_SUITABLE_SET(queryKey), suitable);
    };
  };

  const a = { };

  queryKeys.forEach(key => a[FILTER_BY_STRING_FILTER(key)] = byKey(key));

  return a;
};


const moduleFactory = ({ queryKeys }) => ({
  state: state({ queryKeys }),
  mutations: mutations({ queryKeys }),
  actions: actions({ queryKeys }),
});

const config = {
  queryKeys: ['name', 'identificator'],
};

const module = moduleFactory(config);

export {
  module,

  FILTER_BY_STRING_FILTER,
  FILTER_SUITABLE_SET,
};
