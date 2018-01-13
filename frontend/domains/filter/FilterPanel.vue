<template>
  <div class="filter-panel">
  <h2>Фильтр</h2>

    <v-select
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

    <v-select
    v-if="model.category.length"
    label="Выберите категории"
    :items="model.category"
    v-model="category"
    item-text="name"
    item-value="id"
    max-height="400"
    multiple
    persistent-hint/>

    <v-select
    v-if="model.brand.length"
    label="Выберите бренды"
    :items="model.brand"
    v-model="brand"
    item-text="name"
    item-value="id"
    max-height="400"
    multiple
    persistent-hint/>

    <v-btn
    @click.native="close()"
    block
    class="mb-3">
      Закрыть
    </v-btn>
    <v-btn @click.native="reset()"
    block
    color="red lighten-1">
      Сбросить
    </v-btn>
  </div>
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
import { mapMutations } from 'vuex';

export default {
  name: 'filter-panel',
  computed: {
    model() {
      return {
        types: Object.values(ENTITY_TYPES)
          .filter(v => v !== ENTITY_TYPES.product)
          .map(v => ({ name: v, value: v, disabled: v === this.subtype })),
        subtypes: Object.values(ENTITY_TYPES)
          .map(v => ({ name: v, value: v, disabled: v === this.type })),
        category: this.$store.state.filter.available.category,
        brand: this.$store.state.filter.available.brand,
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
  methods: {
    ...mapMutations({
      close: FILTER_VISIBILITY_TOGGLE,
      reset: FILTER_RESET,
    }),
  },
};
</script>
