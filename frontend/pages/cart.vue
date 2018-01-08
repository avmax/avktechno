<template>
  <v-layout class="page" column>
    <div class="page__header">
      <h1>Корзина</h1>
    </div>

    <v-layout v-if="!data || !data.length" align-center justify-center>
      <h2>Корзина пуста</h2>
    </v-layout>

    <shop-entity-exposition
    v-else
    :type="type"
    :subtype="subtype"
    :data="data"
    @invert="invert"/>
  </v-layout>
</template>

<script>
import ShopEntityExposition from '~/domains/shop/ShopEntityExposition.vue';
import { ENTITY_TYPES } from '~/domains/barrel.types';

export default {
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
    data() {
      const data = this.$store.getters.entities(this.type).map((id) => {
        const collectionModel = this.$store.getters.entity(this.type, id);
        const collection = {
          model: collectionModel,
          items: collectionModel && collectionModel.refs[this.subtype]
            .filter(id => this.$store.state.cart.items.indexOf(id) !== -1)
            .map(id => this.$store.getters.entity(this.subtype, id)),
        };

        return collection;
      });

      return data.filter(c => c.items.length);
    },
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
