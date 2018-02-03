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
        v-model="name"
        @input="filterByString($event, 'name')"
        label="Введите название продукта"
        clearable
      />

      <h3>Поиск по артикулу</h3>
      <v-text-field
        v-model="identificator"
        @input="filterByString($event, 'identificator')"
        label="Введите артиукул продукта"
        clearable
      />

      <v-divider class="mt-3 mb-4"/>

      <v-select
        label="Выберите категорию"
        :items="model.category"
        v-model="category"
        item-text="name"
        item-value="id"
        max-height="400"
        clearable
        persistent-hint
      />

      <v-select
        label="Выберите подкатегории"
        :items="model.subcategory"
        v-model="subcategory"
        :disabled="!category || !!category.refs.product.length"
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
        label="Выберите производителей"
        :items="model.brand"
        v-model="brand"
        :disabled="!category || (!category.refs.product.length && !subcategory.length)"
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

      <v-layout justify-space-between>
        <v-flex xs4>
          <v-text-field
          @input="filterByPrice($event)"
          v-model="priceFrom"
          label="От"
          type="number"/>
        </v-flex>
        <v-flex xs4>
          <v-text-field
          @input="filterByPrice($event)"
          v-model="priceTo"
          label="До"
          type="number"/>
        </v-flex>
        <v-flex xs3>
          <v-select
            @input="filterByPrice($event)"
            label="Валютa"
            :items="['RUB', 'USD', 'EUR']"
            v-model="currency"
            max-height="400"
            persistent-hint
          />
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
  FILTER_HIDDEN_SET,
} from '~/barrel/state';
import { mapState, mapMutations } from 'vuex';
import { uniq, flatten, isEmpty } from 'lodash/fp';

const PRICE_MAXIMUM = 10000000;

export default {
  name: 'filter-panel',
  data() {
    return {
      priceFrom: null,
      priceTo: PRICE_MAXIMUM,
      currency: 'RUB',
      name: null,
      identificator: null,
    };
  },
  computed: {
    ...mapState({
      isFilterPanelOpened: ({ filter }) => filter.isOpened,
    }),
    model() {
      const { getters } = this.$store;
      const category = getters.categories
        .filter(c => c && +c.depth === 1);
      const subcategory = this.category
        ? this.category.refs.category.map(id => getters.category(id))
        : [];
      const brand = getters.brands;
      const product = getters.products;
      return { category, subcategory, product, brand };
    },
    category: {
      get() {
        const { state, getters } = this.$store;
        const { filter } = state;
        const chosen = filter.chosen.category
          .map(id => getters.category(id))
          .filter(c => c && +c.depth === 1);
        return chosen[0];
      },
      set(v) {
        const { commit, getters } = this.$store;
        const categories = [v].map(id => getters.category(id));
        const getRefs = type => uniq(
          flatten(
            categories
              .filter(c => c && !isEmpty(c.refs))
              .map(c => c.refs[type]),
          ),
        );
        commit(FILTER_CHOSEN_SET('category'), [v]);
        commit(FILTER_CHOSEN_SET('brand'), getRefs('brand'));
        commit(FILTER_CHOSEN_SET('product'), getRefs('product'));
      },
    },
    subcategory: {
      get() {
        const { state, getters } = this.$store;
        const { filter } = state;
        const chosen = filter.chosen.category
          .map(id => getters.category(id))
          .filter(c => c && +c.depth === 2);
        return chosen;
      },
      set(v) {
        const { commit, getters } = this.$store;
        const categories = v.map(id => getters.category(id)).concat(this.category);
        const getRefs = type => uniq(
          flatten(
            categories
              .filter(c => c && !isEmpty(c.refs))
              .map(c => c.refs[type]),
          ),
        );
        const brands = getRefs('brand');
        const products = getRefs('product');
        commit(FILTER_CHOSEN_SET('category'), categories.map(c => c.id));
        commit(FILTER_CHOSEN_SET('brand'), brands);
        commit(FILTER_CHOSEN_SET('product'), products);
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
        products = products.filter(
          p => p[key].toLowerCase().indexOf(str.toLowerCase()) === -1,
        );
      } else {
        products = [];
      }

      this.filterProducts(products);
    },
    filterByPrice(v) {
      const to = this.priceTo;
      const from = this.priceFrom;
      let products = this.model.product;
      const currency = this.currency;

      console.log(currency, from, to, this.model.product.length);

      if (v) {
        products = products.filter(p => p.prices[currency] < +from || p.prices[currency] > +to);
      } else {
        products = [];
      }

      this.filterProducts(products);
    },
    filterProducts(products) {
      const { commit } = this.$store;

      commit(FILTER_HIDDEN_SET('product'), products.map(p => p.id));
    },
    resetLocal() {
      this.priceFrom = null;
      this.priceTo = PRICE_MAXIMUM;
      this.name = null;
      this.identificator = null;
      this.currency = 'RUB';
      this.filterByString();
      this.filterByPrice();
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
