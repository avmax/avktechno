<template>
  <v-container fill-height class="page">
    <product-collection>
      <v-flex
        v-for="p in products"
        :key="p.id"
        xs12 sm6 lg4
      >
        <product-item
          :data="p"
        />
      </v-flex>
    </product-collection>
  </v-container>
</template>

<script>
import Edition from '~/domains/edition/Edition/edition';
import EditionControls from '~/domains/edition/Edition/controls';
import EditionGhost from '~/domains/edition/Edition/ghost';
import ProductCollection from '~/domains/shop/Product/collection.vue';
import ProductItem from '~/domains/shop/Product/item.vue';

export default {
  layout: 'hard',
  components: {
    Edition,
    EditionControls,
    EditionGhost,
    ProductCollection,
    ProductItem,
  },
  computed: {
    products() {
      const { state, getters } = this.$store;
      const { filter } = state;
      const IDs = filter.product.identificator;
      const items = IDs.map(id => getters.product(id));
      return items;
    },
  },
};
</script>
