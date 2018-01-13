<template>
  <shop-entitity-view-product :id="id" is-editable/>
</template>

<script>
import ShopEntitityViewProduct from '~/domains/shop/ShopEntityViewProduct.vue';

export default {
  layout: 'normal',
  components: {
    ShopEntitityViewProduct,
  },
  computed: {
    id() { return this.$route.params.id; },
  },
};
</script>
