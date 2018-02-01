import Vue from 'vue';

const CART_ITEM_ADD = 'Добавить товар в корзину';
const CART_ITEM_REMOVE = 'Выкинуть товар из корзины';


const state = () => ({
  items: {},
});

const mutations = {
  [CART_ITEM_ADD](state, id) {
    const { items } = state;
    if (!items[id]) {
      Vue.set(items, id, 1);
    } else {
      items[id] += 1;
    }
  },
  [CART_ITEM_REMOVE](state, id) {
    const { items } = state;
    items[id] -= 1;
    if (items[id] === 0) {
      Vue.delete(items, id);
    }
  },
};

const module = {
  state,
  mutations,
};

export {
  module,

  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
};
