import Vue from 'vue';
import { CURRENCY_TYPES } from '~/barrel/types';

const CART_ITEM_ADD = 'Добавить товар в корзину';
const CART_ITEM_REMOVE = 'Выкинуть товар из корзины';


const state = () => ({
  items: {},
});

const getters = {
  totalPrice: (state, getters) => {
    const { items } = state;
    const prices = { };
    Object.values(CURRENCY_TYPES).forEach((type) => {
      let total = 0;

      Object.keys(items).forEach((key) => {
        const val = items[key];
        const price = getters.product(key).prices[type];
        total += val * price;
      });

      prices[type] = total;
    });

    return prices;
  },
};

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
  getters,
  mutations,
};

export {
  module,

  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
};
