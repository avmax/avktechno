<template>
  <v-layout class="page" column>
    <div class="page__header">
      <h1 class="text-xs-center">Все категории</h1>
    </div>
    <shop-entity-exposition
    :type="type"
    :subtype="subtype"
    :invert="{ false: 'Показать бренды', true: 'Показать продукты' }"
    @invert="invert"/>
  </v-layout>
</template>



<script>
import ShopEntityExposition from '~/domains/shop/ShopEntityExposition.vue';
import { ENTITY_TYPES } from '~/domains/barrel.types';
// eslint-disable-next-line

export default {
  name: 'page-categories-brands',
  components: {
    ShopEntityExposition,
  },
  data() {
    return {
      type: ENTITY_TYPES.category,
      subtype: ENTITY_TYPES.product,
    };
  },
  methods: {
    invert() {
      this.subtype = this.subtype !== ENTITY_TYPES.product
        ? ENTITY_TYPES.product
        : ENTITY_TYPES.brand;
    },
  },
};
</script>
