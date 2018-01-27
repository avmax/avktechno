import {
  ENTITY_TYPES,
} from '~/domains/barrel.types';

const FILTER_VISIBILITY_TOGGLE = 'фильтр: toggle отображение';
const FILTER_TYPE_SET = 'фильтр: задать тип';
const FILTER_SUBTYPE_SET = 'фильтр: задать подтип';
const FILTER_DROP = 'фильтр: сбросить полностью';
const FILTER_HIDDEN_SET = entityType => `фильтр: спрятать итемы типа <${entityType}>`;


const state = (entityTypes) => {
  const s = {
    isOpened: false,
    type: null,
    subtype: null,
    hidden: { },
  };

  Object.values(entityTypes).forEach((type) => {
    s.hidden[type] = [];
  });

  return s;
};

const mutations = (entityTypes) => {
  const hiddenSet = function(type) {
    return (state, payload) => {
      console.log(`hiddenSet ${type}`, payload);
      state.hidden[type] = payload;
    };
  };

  const m = {
    [FILTER_VISIBILITY_TOGGLE](state) {
      state.isOpened = !state.isOpened;
    },
    [FILTER_TYPE_SET](state, payload) {
      state.type = payload;
    },
    [FILTER_SUBTYPE_SET](state, payload) {
      state.subtype = payload;
    },
    [FILTER_DROP](state) {
      state.type = null;
      state.subtype = null;

      Object.values(entityTypes).forEach((type) => {
        state.hidden[type] = [];
      });
    },
  };

  Object.values(entityTypes).forEach((type) => {
    m[FILTER_HIDDEN_SET(type)] = hiddenSet(type);
  });

  return m;
};

const actions = () => {
  const a = { };
  return a;
};

const module = {
  state: state(ENTITY_TYPES),
  mutations: mutations(ENTITY_TYPES),
  actions: actions(),
};


export {
  module,

  FILTER_VISIBILITY_TOGGLE,
  FILTER_TYPE_SET,
  FILTER_SUBTYPE_SET,
  FILTER_DROP,
  FILTER_HIDDEN_SET,
};
