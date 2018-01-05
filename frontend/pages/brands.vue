<template>
  <v-layout
  class="page"
  column>
    <div class="page__header">
      <h1>Страница бренды</h1>
      <v-switch
      :label="`${!isInverted ? 'Показать категории' : 'Показать продукты'}`"
      v-model="isInverted"/>
    </div>
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
  computed: {
    isInverted: {
      get() { return this.subtype !== ENTITY_TYPES.product; },
      set() {
        this.subtype = this.subtype !== ENTITY_TYPES.product
          ? ENTITY_TYPES.product
          : ENTITY_TYPES.category;
      },
    },
  },
};
</script>
