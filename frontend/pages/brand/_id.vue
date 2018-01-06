<template>
  <v-layout
  v-if="model"
  class="page"
  column>
      <div class="page__header">
        <h1>Страница бренда {{model.name}}</h1>
      </div>
    <v-flex xs12>
      <shop-entity-exposition
      :data="model.refs.category"
      :type="type"
      :subtype="subtype"/>
    </v-flex>
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
      type: ENTITY_TYPES.category,
      subtype: ENTITY_TYPES.product,
    };
  },
  computed: {
    model() { return this.$store.getters.entity(ENTITY_TYPES.brand, this.$route.params.id); },
  },
};
</script>
