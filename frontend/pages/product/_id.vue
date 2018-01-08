<template>
  <shop-entitity-view-product :type="type" :id="id"/>
</template>

<script>
import ShopEntitityViewProduct from '~/domains/shop/ShopEntityViewProduct.vue';
import { ENTITY_TYPES } from '~/domains/barrel.types';

export default {
  components: {
    ShopEntitityViewProduct,
  },
  data() {
    return {
      type: ENTITY_TYPES.product,
    };
  },
  computed: {
    id() { return this.$route.params.id; },
  },
};
</script>
