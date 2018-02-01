<template>
  <layout-base>

    <template slot="header">
      <v-btn
        @click.native="filterPanelToggle"
        flat class="mx-0"
      >
        <span style="font-weight: bold;" class="white--text">Фильтр</span>
      </v-btn>
    </template>

    <template slot="panels">
      <edition-panel/>
      <filter-panel/>
    </template>

  </layout-base>
</template>

<script>
import LayoutBase from '~/layouts/base';
import {
  FILTER_VISIBILITY_TOGGLE,
} from '~/barrel/state';
import EditionPanel from '~/domains/edition/Panel/base.vue';
import FilterPanel from '~/domains/filter/Panel/base.vue';

export default {
  name: 'layout-advanced',
  components: {
    LayoutBase,
    EditionPanel,
    FilterPanel,
  },
  methods: {
    filterPanelToggle() { this.$store.commit(FILTER_VISIBILITY_TOGGLE); },
  },
};
</script>
