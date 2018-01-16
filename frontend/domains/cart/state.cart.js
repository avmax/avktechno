const CART_ITEM_ADD = 'Добавить товар в корзину';
const CART_ITEM_REMOVE = 'Выкинуть товар из корзины';


const state = () => ({
  items: [],
});

const mutations = {
  [CART_ITEM_ADD](state, id) {
    const { items } = state;
    const index = items.indexOf(id);
    if (index === -1) {
      items.push(id);
    }
  },
  [CART_ITEM_REMOVE](state, id) {
    const { items } = state;
    const index = items.indexOf(id);
    items.splice(index, 1);
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
