import { CART_ITEM_ADD, CART_ITEM_REMOVE } from '~/domains/barrel.state';

export default {
  computed: {
    model() { return this.$store.getters.product(this.id); },
    brand() {
      const { getters } = this.$store;
      const { refs } = this.model;
      const ID = refs.brand[0];
      const brand = getters.brand(ID);

      return brand;
    },
    category() {
      const { getters } = this.$store;
      const { refs } = this.model;
      const ID = refs.category[0];
      const category = getters.category(ID);

      return category;
    },
    count() {
      const { state } = this.$store;
      const id = this.model.id;
      return state.cart.items[id];
    },
  },
  methods: {
    addToCart() {
      const { commit } = this.$store;
      const id = this.model.id;
      commit(CART_ITEM_ADD, id);
    },
    removeFromCart() {
      const { commit } = this.$store;
      const id = this.model.id;
      commit(CART_ITEM_REMOVE, id);
    },
  },
};
