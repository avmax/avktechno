import { CART_ITEM_ADD, CART_ITEM_REMOVE } from '~/domains/barrel.state';

export default {
  computed: {
    isAddedToCart() { return this.$store.state.cart.items.indexOf(this.id) !== -1; },
  },
  methods: {
    addToCart() {
      this.$store.commit(CART_ITEM_ADD, this.id);
    },
    removeFromCart() {
      this.$store.commit(CART_ITEM_REMOVE, this.id);
    },
  },
};
