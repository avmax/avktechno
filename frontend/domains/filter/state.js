import {
  ENTITY_TYPES,
} from '~/domains/barrel.types';

const FILTER_VISIBILITY_TOGGLE = 'фильтр: toggle отображение';
const FILTER_VISIBILITY_SET = 'фильтр: задать отображение';
const FILTER_DROP = 'фильтр: сбросить полностью';
const FILTER_CHOSEN_SET = entityType => `фильтр: показать итемы типа <${entityType}>`;


const state = (entityTypes) => {
  const s = {
    isOpened: false,
    chosen: { },
  };

  Object.values(entityTypes).forEach((type) => {
    s.chosen[type] = [];
  });

  return s;
};

const mutations = (entityTypes) => {
  const chosenSet = function(type) {
    return (state, payload) => {
      state.chosen[type] = payload;
    };
  };


  const m = {
    [FILTER_VISIBILITY_TOGGLE](state) {
      state.isOpened = !state.isOpened;
    },
    [FILTER_VISIBILITY_SET](state, payload) {
      state.isOpened = payload;
    },
    [FILTER_DROP](state) {
      state.type = null;
      state.subtype = null;

      Object.values(entityTypes).forEach((type) => {
        state.chosen[type] = [];
      });
    },
  };

  Object.values(entityTypes).forEach((type) => {
    m[FILTER_CHOSEN_SET(type)] = chosenSet(type);
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

  FILTER_VISIBILITY_SET,
  FILTER_VISIBILITY_TOGGLE,
  FILTER_DROP,
  FILTER_CHOSEN_SET,
};
