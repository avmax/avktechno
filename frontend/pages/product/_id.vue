<template>
  <view-product :id="id"/>
</template>

<script>
import ViewProduct from '~/domains/shop/EntityView/product.vue';

export default {
  layout: 'normal',
  components: {
    ViewProduct,
  },
  computed: {
    id() { return this.$route.params.id; },
  },
};
</script>
