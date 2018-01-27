import { CART_ITEM_ADD, CART_ITEM_REMOVE } from '~/domains/barrel.state';

export default {
  computed: {
    count() { return this.$store.state.cart.items[this.id]; },
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
