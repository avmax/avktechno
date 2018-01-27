<template>
  <v-navigation-drawer
    :permanent="$vuetify.breakpoint.smAndUp"
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
        label="Введите название продукта"
      />

      <h3>Поиск по VIN номеру</h3>
      <v-text-field
        v-model="vin"
        label="Введите VIN продукта"
      />

      <v-divider class="mt-3 mb-4"/>

      <!-- <v-select
      v-if="type"
      label="Выберите тип"
      :items="model.types"
      item-text="name"
      item-value="value"
      item-disabled="disabled"
      v-model="type"
      persistent-hint/>

      <v-select
      v-if="subtype"
      label="Выберите подтип"
      :items="model.subtypes"
      item-text="name"
      item-value="value"
      item-disabled="disabled"
      v-model="subtype"
      persistent-hint/>

      <v-divider class="mt-3 mb-4"/> -->

      <v-select
      label="Выберите категории"
      :items="model.category"
      v-model="category"
      item-text="name"
      item-value="id"
      max-height="400"
      multiple
      persistent-hint/>

      <v-select
      label="Выберите бренды"
      :items="model.brand"
      v-model="brand"
      item-text="name"
      item-value="id"
      max-height="400"
      multiple
      persistent-hint/>

      <v-divider class="mt-3 mb-4"/>

      <h3>Цена:</h3>

      <v-layout>
        <v-flex xs6 class="mr-4">
          <v-text-field
          v-model="priceFrom"
          label="От"
          type="number"/>
        </v-flex>
        <v-flex xs6>
          <v-text-field
          v-model="priceTo"
          label="До"
          type="number"/>
        </v-flex>
      </v-layout>

      <v-divider class="mt-3 mb-5"/>

      <v-btn
      @click.native="close()"
      block
      secondary
      class="hidden-sm-and-up mb-3">
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
import { ENTITY_TYPES } from '~/domains/barrel.types';
import {
  FILTER_VISIBILITY_TOGGLE,
  FILTER_HIDDEN_SET,
  FILTER_DROP,
} from '~/domains/barrel.state';
import { mapState, mapMutations } from 'vuex';
import { difference } from 'lodash/fp';

export default {
  name: 'filter-panel',
  data() {
    return {
      types: {
        [ENTITY_TYPES.category]: 'Категория',
        [ENTITY_TYPES.brand]: 'Бренд',
        [ENTITY_TYPES.product]: 'Продукт',
      },
      priceTo: null,
      priceFrom: null,
      name: null,
      vin: null,
    };
  },
  computed: {
    ...mapState({
      isFilterPanelOpened: ({ filter }) => filter.isOpened,
    }),
    model() {
      const { getters, state } = this.$store;
      const { shop } = state;

      return {
        types: Object.values(ENTITY_TYPES)
          .filter(v => v !== ENTITY_TYPES.product)
          .map(v => ({ name: this.types[v], value: v, disabled: v === this.subtype })),
        subtypes: Object.values(ENTITY_TYPES)
          .map(v => ({ name: this.types[v], value: v, disabled: v === this.type })),
        category: getters.entities(ENTITY_TYPES.category),
        brand: getters.entities(ENTITY_TYPES.brand),
        product: getters.entities(ENTITY_TYPES.product),
      };
    },
    // type: {
    //   get() {
    //     return this.$store.state.filter.type;
    //   },
    //   set(v) {
    //     this.$store.commit(FILTER_TYPE_SET, v);
    //   },
    // },
    // subtype: {
    //   get() {
    //     return this.$store.state.filter.subtype;
    //   },
    //   set(v) {
    //     this.$store.commit(FILTER_SUBTYPE_SET, v);
    //   },
    // },
    category: {
      get() {
        const { filter } = this.$store.state;
        const all = this.model.category;
        const hidden = filter.hidden.category;
        return all.filter(c => hidden.indexOf(c.id) === -1);
      },
      set(v) { this.filterByIDs(v, 'category'); },
    },
    brand: {
      get() {
        const { filter } = this.$store.state;
        const all = this.model.brand;
        const hidden = filter.hidden.brand;
        return all.filter(b => hidden.indexOf(b.id) === -1);
      },
      set(v) { this.filterByIDs(v, 'brand'); },
    },
  },
  watch: {
    priceFrom(v) {
      if (v) {
        const products = this.model.product.filter(p => p.price < +v).map(p => p.id);
        this.$store.commit(FILTER_HIDDEN_SET(ENTITY_TYPES.product), products);
      }
    },
    priceTo(v) {
      if (v) {
        const products = this.model.product.filter(p => p.price > +v).map(p => p.id);
        this.$store.commit(FILTER_HIDDEN_SET(ENTITY_TYPES.product), products);
      }
    },
    name(v) { this.filterByString(v, 'name'); },
    vin(v) { this.filterByString(v, 'vin'); },
  },
  methods: {
    ...mapMutations({
      close: FILTER_VISIBILITY_TOGGLE,
    }),
    filterByString(str, key) {
      const arr = this.model.product;
      const { commit } = this.$store;
      let payload;

      if (str) {
        payload = arr.filter(a => a[key].toLowerCase().indexOf(str.toLowerCase()) === -1);
        payload = payload.map(r => r.id);
      } else {
        payload = [];
      }

      commit(FILTER_HIDDEN_SET(ENTITY_TYPES.product), payload);
    },
    filterByIDs(v, key) {
      const all = Object.values(this.model[key]).map(o => o.id);
      const payload = difference(all, v);
      this.$store.commit(FILTER_HIDDEN_SET(ENTITY_TYPES[key]), payload);
    },
    reset() {
      const { commit } = this.$store;
      commit(FILTER_DROP);
      this.priceTo = null;
      this.priceFrom = null;
      this.name = null;
      this.vin = null;
    },
  },
};
</script>
