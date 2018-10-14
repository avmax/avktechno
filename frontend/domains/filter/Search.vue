<template>
  <div class="avm-search px-3">
    <v-text-field
      label="Искать по артикулу"
      color="secondary"
      @input="search($event)"
    />
  </div>
</template>

<script>
import { FILTER_MULTIPLE_SET } from '~/barrel/state';

export default {
  computed: {
    products() { return this.$store.getters.products; },
  },
  methods: {
    search(str) {
      const { $store, $route, products } = this;
      const { commit } = $store;
      const suitable = products
        .filter(p => p.identificator.toLowerCase().indexOf(str.toLowerCase()) !== -1)
        .map(p => p.id);
      commit(FILTER_MULTIPLE_SET('product', 'identificator'), suitable);

      if (str && $route.name !== 'query') {
        this.$router.push({ name: 'query' });
      } else if (!str && $route.name !== 'index') {
        this.$router.push({ name: 'index' });
      }
    },
  },
};
</script>

