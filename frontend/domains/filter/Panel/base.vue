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

      <h3>Поиск по номеру</h3>
      <v-text-field
        v-model="name"
        label="Введите название продукта"
      />

      <v-divider class="mt-3 mb-4"/>

      <v-select
      v-if="type"
      label="Выберите тип"
      :items="model.types"
      item-text="name"
      item-value="value"
      item-disabled="disabled"
      v-model="type"
      persistent-hint
      color="white"/>

      <v-select
      v-if="subtype"
      label="Выберите подтип"
      :items="model.subtypes"
      item-text="name"
      item-value="value"
      item-disabled="disabled"
      v-model="subtype"
      persistent-hint
      color="white"/>

      <v-divider class="mt-3 mb-4"/>

      <v-select
      label="Выберите категории"
      :items="model.category"
      v-model="category"
      item-text="name"
      item-value="id"
      max-height="400"
      multiple
      persistent-hint
      color="white"/>

      <v-select
      label="Выберите бренды"
      :items="model.brand"
      v-model="brand"
      item-text="name"
      item-value="id"
      max-height="400"
      multiple
      persistent-hint
      color="white"/>

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
  FILTER_TYPE_SET,
  FILTER_SUBTYPE_SET,
  FILTER_ENTITY_CHOSEN_SET,
  FILTER_RESET,
  FILTER_VISIBILITY_TOGGLE,
} from '~/domains/barrel.state';
import { mapState, mapMutations } from 'vuex';

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
    };
  },
  computed: {
    ...mapState({
      isFilterPanelOpened: ({ filter }) => filter.isActive,
    }),
    model() {
      const { getters, state } = this.$store;
      const { filter } = state;

      return {
        types: Object.values(ENTITY_TYPES)
          .filter(v => v !== ENTITY_TYPES.product)
          .map(v => ({ name: this.types[v], value: v, disabled: v === this.subtype })),
        subtypes: Object.values(ENTITY_TYPES)
          .map(v => ({ name: this.types[v], value: v, disabled: v === this.type })),
        category: filter.available.category.map(id => getters.entity(ENTITY_TYPES.category, id)),
        brand: filter.available.brand.map(id => getters.entity(ENTITY_TYPES.brand, id)),
        product: filter.available.product.map(id => getters.entity(ENTITY_TYPES.product, id)),
      };
    },
    type: {
      get() {
        return this.$store.state.filter.type;
      },
      set(v) {
        this.$store.commit(FILTER_TYPE_SET, v);
      },
    },
    subtype: {
      get() {
        return this.$store.state.filter.subtype;
      },
      set(v) {
        this.$store.commit(FILTER_SUBTYPE_SET, v);
      },
    },
    category: {
      get() {
        return this.$store.state.filter.chosen.category;
      },
      set(v) {
        this.$store.commit(FILTER_ENTITY_CHOSEN_SET(ENTITY_TYPES.category), v);
      },
    },
    brand: {
      get() {
        return this.$store.state.filter.chosen.brand;
      },
      set(v) {
        this.$store.commit(FILTER_ENTITY_CHOSEN_SET(ENTITY_TYPES.brand), v);
      },
    },
  },
  watch: {
    priceFrom(v) {
      if (v) {
        const products = this.model.product.filter(p => p.price >= +v).map(p => p.id);
        this.$store.commit(FILTER_ENTITY_CHOSEN_SET(ENTITY_TYPES.product), products);
      }
    },
    priceTo(v) {
      if (v) {
        const products = this.model.product.filter(p => p.price <= +v).map(p => p.id);
        this.$store.commit(FILTER_ENTITY_CHOSEN_SET(ENTITY_TYPES.product), products);
      }
    },
    name(v) {
      if (v) {
        const products = this.model.product.filter(p => p.name.indexOf(v) !== -1).map(p => p.id);
        this.$store.commit(FILTER_ENTITY_CHOSEN_SET(ENTITY_TYPES.product), products);
      }
    },
  },
  methods: {
    ...mapMutations({
      close: FILTER_VISIBILITY_TOGGLE,
    }),
    reset() {
      const { commit } = this.$store;
      this.priceTo = null;
      this.priceFrom = null;
      this.name = null;
      commit(FILTER_RESET);
    },
  },
};
</script>
