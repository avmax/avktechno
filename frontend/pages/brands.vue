<template>
  <v-layout
  class="page"
  column>
    <h1>Страница бренды</h1>
    <v-flex xs12>
      <shop-entity-exposition
      :type="type"
      :subtype="subtype"/>
    </v-flex>
  </v-layout>
</template>



<script>
import ShopEntityExposition from '~/domains/shop/ShopEntityExposition.vue';
import { ENTITY_TYPES } from '~/domains/shop/state.shop';

export default {
  name: 'page-categories-brands',
  components: {
    ShopEntityExposition,
  },
  data() {
    return {
      type: ENTITY_TYPES.brand,
      subtype: ENTITY_TYPES.product,
    };
  },
};
</script>
