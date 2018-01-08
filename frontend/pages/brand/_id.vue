<template>
  <v-layout
  v-if="model"
  class="page"
  column>
    <div class="page__header">
      <h1 class="text-xs-left text-md-center">Страница бренда {{model.name}}</h1>
    </div>
    <shop-entity-exposition
    :data="data"
    :type="type"
    :subtype="subtype"/>
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
    data() {
      return this.model && this.model.refs[this.type].map((id) => {
        const collectionModel = this.$store.getters.entity(this.type, id);
        const collection = {
          model: collectionModel,
          items: collectionModel && collectionModel.refs[this.subtype]
            .filter(id => this.model && this.model.refs[ENTITY_TYPES.product].indexOf(id) !== -1)
            .map(id => this.$store.getters.entity(this.subtype, id)),
        };

        return collection;
      });
    },
  },
};
</script>
