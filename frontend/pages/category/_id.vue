<template>
  <v-layout
  v-if="model"
  class="page"
  column>
      <div class="page__header">
        <h1>Страница категории {{model.name}}</h1>
      </div>
    <v-flex xs12>
      <shop-entity-exposition
      :data="model.refs.brand"
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
    model() { return this.$store.getters.entity(ENTITY_TYPES.category, this.$route.params.id); },
  },
};
</script>
