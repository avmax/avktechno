<template>
  <v-layout class="page" column>
    <div class="page__header">
      <h1 class="text-xs-left text-md-center">Все продукты</h1>
    </div>
    <shop-entity-exposition
    :type="type"
    :subtype="subtype"
    :invert="{ false: 'категориям', true: 'брендам' }"
    @invert="invert"/>
  </v-layout>
</template>



<script>
import ShopEntityExposition from '~/domains/shop/ShopEntityExposition.vue';
import { ENTITY_TYPES } from '~/domains/barrel.types';

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
  methods: {
    invert() {
      this.type = this.type === ENTITY_TYPES.brand
        ? ENTITY_TYPES.category
        : ENTITY_TYPES.brand;
    },
  },
};
</script>
