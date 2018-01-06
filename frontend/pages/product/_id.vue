<template>
  <v-layout class="page">
    <shop-entitity-view :type="type" :id="id"/>
  </v-layout>
</template>

<script>
import ShopEntitityView from '~/domains/shop/ShopEntityView.vue';
import { ENTITY_TYPES } from '~/domains/barrel.types';

export default {
  components: {
    ShopEntitityView,
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
