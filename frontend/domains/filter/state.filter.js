import {
  ENTITY_TYPES,
} from '~/domains/barrel.types';

const FILTER_VISIBILITY_TOGGLE = 'фильтр: toggle отображение';
const FILTER_TYPE_SET = 'фильтр: задать тип';
const FILTER_SUBTYPE_SET = 'фильтр: задать подтип';
const FILTER_DROP = 'фильтр: сбросить полностью';
const FILTER_RESET = 'фильтр: сбросить';
const FILTER_PRICE_SET = 'фильтр: сортировать продукты по цене';
const FILTER_ENTITY_AVAILABLE_SET = entityType => `фильтр: установить возможные сущности типа <${entityType}>`;
const FILTER_ENTITY_AVAILABLE_ADD = entityType => `фильтр: добавить возможную сущность типа <${entityType}>`;
const FILTER_ENTITY_AVAILABLE_REMOVE = entityType => `фильтр: убрать возможную сущность типа <${entityType}>`;
const FILTER_ENTITY_CHOSEN_SET = entityType => `фильтр: установить выбранные типа <${entityType}>`;


const state = () => {
  const s = {
    isActive: false,
    type: null,
    subtype: null,
    price: {
      from: null,
      to: null,
    },
    available: {},
    chosen: {},
  };

  Object.values(ENTITY_TYPES).map(v => s.available[v] = []);
  Object.values(ENTITY_TYPES).map(v => s.chosen[v] = []);

  return s;
};

const mutations = (entityTypes) => {
  const filterEntityAvailableSet = function(type) {
    return (state, payload) => {
      state.available[type] = payload;
      state.chosen[type] = payload.map(p => p.id);
    };
  };

  const filterEntityAvailableAdd = function(type) {
    return (state, payload) => {
      state.available[type].push(payload);
      state.chosen[type].push(payload.id);
    };
  };

  const filterEntityAvailableRemove = function(type) {
    return (state, payload) => {
      let index = -1;
      state.available[type].forEach((e, i) => e.id === payload ? index = i : null);
      if (index !== -1) {
        state.available[type].splice(index, 1);
      }

      index = state.chosen[type].indexOf(payload);
      if (index !== -1) {
        state.chosen[type].splice(index, 1);
      }
    };
  };

  const filterEntityChosenSet = function(type) {
    return (state, payload) => {
      state.chosen[type] = payload;
    };
  };

  const m = {
    [FILTER_VISIBILITY_TOGGLE](state) {
      state.isActive = !state.isActive;
    },
    [FILTER_TYPE_SET](state, payload) {
      state.type = payload;
    },
    [FILTER_SUBTYPE_SET](state, payload) {
      state.subtype = payload;
    },
    [FILTER_RESET](state) {
      Object.values(entityTypes).forEach((v) => {
        state.chosen[v] = state.available[v].map(e => e.id);
      });
    },
    [FILTER_DROP](state) {
      state.type = null;
      state.subtype = null;
      state.price = {
        from: null,
        to: null,
      };

      Object.values(ENTITY_TYPES).map(v => state.chosen[v] = []);
      Object.values(ENTITY_TYPES).map(v => state.available[v] = []);
    },
  };

  Object.values(entityTypes)
    .forEach((type) => {
      m[FILTER_ENTITY_AVAILABLE_SET(type)] = filterEntityAvailableSet(type);
      m[FILTER_ENTITY_AVAILABLE_ADD(type)] = filterEntityAvailableAdd(type);
      m[FILTER_ENTITY_AVAILABLE_REMOVE(type)] = filterEntityAvailableRemove(type);
      m[FILTER_ENTITY_CHOSEN_SET(type)] = filterEntityChosenSet(type);
    });

  return m;
};

const actions = {
  [FILTER_PRICE_SET]({ commit }, payload) {
    console.log(!!commit, payload);
  },
};

const module = {
  state: state(),
  mutations: mutations(ENTITY_TYPES),
  actions: actions,
};


export {
  module,

  FILTER_VISIBILITY_TOGGLE,
  FILTER_PRICE_SET,
  FILTER_TYPE_SET,
  FILTER_SUBTYPE_SET,
  FILTER_ENTITY_AVAILABLE_SET,
  FILTER_ENTITY_AVAILABLE_ADD,
  FILTER_ENTITY_AVAILABLE_REMOVE,
  FILTER_ENTITY_CHOSEN_SET,
  FILTER_DROP,
  FILTER_RESET,
};
