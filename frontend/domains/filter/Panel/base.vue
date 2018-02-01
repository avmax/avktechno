<template>
  <v-navigation-drawer
    :value="isFilterPanelOpened"
    fixed
    left
    clipped
    app
    hide-overlay
    mobile-break-point="1080"
    width="400"
    class="pa-3"
  >
    <div class="filter-panel">
    <h2 class="mb-3">Фильтр</h2>

      <h3>Поиск по названию</h3>
      <v-text-field
        :value="name"
        @input="filterByString($event, 'name')"
        label="Введите название продукта"
        clearable
      />

      <h3>Поиск по VIN номеру</h3>
      <v-text-field
        :value="identificator"
        @input="filterByString($event, 'identificator')"
        label="Введите VIN продукта"
        clearable
      />

      <v-divider class="mt-3 mb-4"/>

      <v-select
        label="Выберите категории"
        :items="model.category"
        v-model="category"
        item-text="name"
        item-value="id"
        max-height="400"
        multiple
        chips
        deletable-chips
        clearable
        persistent-hint
      />

      <v-select
        label="Выберите бренды"
        :items="model.brand"
        v-model="brand"
        :disabled="!model.brand.length"
        item-text="name"
        item-value="id"
        max-height="400"
        multiple
        chips
        deletable-chips
        clearable
        persistent-hint
      />

      <v-divider class="mt-3 mb-4"/>

      <h3>Цена:</h3>

      <v-layout>
        <v-flex xs6 class="mr-4">
          <v-text-field
          @input="filterByPrice($event)"
          v-model="priceFrom"
          label="От"
          type="number"/>
        </v-flex>
        <v-flex xs6>
          <v-text-field
          @input="filterByPrice($event)"
          v-model="priceTo"
          label="До"
          type="number"/>
        </v-flex>
      </v-layout>

      <v-divider class="mt-3 mb-5"/>

      <v-btn
      @click.native="close(false)"
      block
      secondary
      class="mb-3">
        Закрыть
      </v-btn>
      <v-btn @click.native="reset()"
      block
      color="red lighten-1">
        Сбросить
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {
  FILTER_VISIBILITY_SET,
  FILTER_CHOSEN_SET,
  FILTER_DROP,
} from '~/barrel/state';
import { mapState, mapMutations } from 'vuex';
import { uniq, flatten } from 'lodash/fp';

const PRICE_MAXIMUM = 10000000;

export default {
  name: 'filter-panel',
  data() {
    return {
      priceFrom: null,
      priceTo: PRICE_MAXIMUM,
      name: null,
      identificator: null,
    };
  },
  computed: {
    ...mapState({
      isFilterPanelOpened: ({ filter }) => filter.isOpened,
    }),
    model() {
      const { state, getters } = this.$store;
      const { filter } = state;
      const category = getters.categories;
      const brand = getters.brands.filter((b) => {
        const { id } = b;
        return filter.chosen.brand.indexOf(id) !== -1;
      });
      // const brand = getters.brands;
      const product = getters.products;
      return { category, product, brand };
    },
    category: {
      get() {
        const { state, getters } = this.$store;
        const { filter } = state;
        const chosen = filter.chosen.category.map(id => getters.category(id));
        return chosen;
      },
      set(v) {
        const { commit, getters } = this.$store;
        commit(FILTER_CHOSEN_SET('category'), v);
        const categories = v.map(id => getters.category(id));
        const getRefs = type => uniq(flatten(categories.map(c => c.refs[type])));
        commit(FILTER_CHOSEN_SET('brand'), getRefs('brand'));
        commit(FILTER_CHOSEN_SET('product'), getRefs('product'));
      },
    },
    brand: {
      get() {
        const { state, getters } = this.$store;
        const { filter } = state;
        const chosen = filter.chosen.brand.map(id => getters.brand(id));
        return chosen;
      },
      set(v) {
        const { commit } = this.$store;
        commit(FILTER_CHOSEN_SET('brand'), v);
      },
    },
  },
  methods: {
    ...mapMutations({
      close: FILTER_VISIBILITY_SET,
    }),
    filterByString(str, key) {
      let products = this.model.product;

      if (str) {
        products = products.filter(p => p[key].toLowerCase().indexOf(str.toLowerCase()) !== -1);
      } else {
        products = [];
      }

      this.filterProducts(products);
    },
    filterByPrice(v) {
      const to = this.priceTo;
      const from = this.priceFrom;
      let products = this.model.product;

      if (v) {
        products = products.filter(p => p.price >= +from && p.price <= +to);
      } else {
        products = [];
      }

      this.filterProducts(products);
    },
    filterProducts(products) {
      const { commit } = this.$store;
      let payload;

      const normalize = type => uniq(flatten(products.map(p => p.refs[type])));

      this.resetLocal();
      payload = normalize('category');
      commit(FILTER_CHOSEN_SET('category'), payload);
      payload = normalize('brand');
      commit(FILTER_CHOSEN_SET('brand'), payload);
      payload = products.map(r => r.id);
      commit(FILTER_CHOSEN_SET('product'), payload);
    },
    resetLocal() {
      this.priceFrom = null;
      this.priceTo = PRICE_MAXIMUM;
      this.name = null;
      this.identificator = null;
    },
    reset() {
      const { commit } = this.$store;
      commit(FILTER_DROP);
      this.resetLocal();
    },
  },
  mounted() {
    const { commit } = this.$store;
    const breakpoint = this.$vuetify.breakpoint.smAndUp;
    commit(FILTER_VISIBILITY_SET, breakpoint);
  },
};
</script>
