<template>
  <v-app id="avmax" dark>

    <the-header>
      <v-btn @click.native="filterPanelToggle" flat class="mr-3">
        <span class="hidden-sm-and-down" style="font-weight: normal;">Фильтр</span>
        <v-icon class="hidden-md-and-up" large color="grey lighten-1">sort</v-icon>
      </v-btn>
    </the-header>

    <template v-if="!isSpinner">
      <v-navigation-drawer
      :value="isEditionPanelOpened"
      disable-resize-watcher
      disable-route-watcher
      mobile-break-point="1080"
      width="400"
      class="pa-3"
      clipped
      fixed
      app>
        <component :is="editionPanel"/>
      </v-navigation-drawer>

      <v-navigation-drawer
      :value="isFilterPanelOpened"
      fixed
      left
      clipped
      app
      disable-resize-watcher
      disable-route-watcher
      mobile-break-point="1080"
      width="400"
      class="pa-3">
        <filter-panel/>
      </v-navigation-drawer>

      <v-content>
        <the-notifications/>
        <v-container fluid >
          <v-layout column fill-width>
            <v-flex>
              <nuxt/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>

    <template v-else>
      <v-layout  row align-center justify-center>
        <grid-loader :loading="true" color="teal"/>
      </v-layout>
    </template>

    <the-footer/>
  </v-app>
</template>

<script>
import TheHeader from '~/domains/common/TheHeader.vue';
import TheFooter from '~/domains/common/TheFooter.vue';
import TheNotifications from '~/domains/common/TheNotifications.vue';
import {
  ENTITY_ALL_LOAD,
  FILTER_VISIBILITY_TOGGLE,
  SPINNER_HIDE,
} from '~/domains/barrel.state';
import { ENTITY_TYPES } from '~/domains/barrel.types';
import EditionPanelCategory from '~/domains/edition/EditionPanelCategory.vue';
import EditionPanelBrand from '~/domains/edition/EditionPanelBrand.vue';
import EditionPanelProduct from '~/domains/edition/EditionPanelProduct.vue';
import FilterPanel from '~/domains/filter/FilterPanel.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import { mapState } from 'vuex';

export default {
  name: 'layout-advanced',
  components: {
    TheHeader,
    TheFooter,
    TheNotifications,
    EditionPanelCategory,
    EditionPanelBrand,
    EditionPanelProduct,
    FilterPanel,
    GridLoader,
  },
  data() {
    return {
      test: false,
    };
  },
  computed: {
    ...mapState({
      isSpinner: ({ ui }) => ui.spinner,
      isEditionPanelOpened: ({ edition }) => edition.isEnabled,
      isFilterPanelOpened: ({ filter }) => filter.isActive,
      editionPanel({ edition }) {
        let component;
        switch (edition.entityType) {
          case (ENTITY_TYPES.brand):
            component = EditionPanelBrand;
            break;
          case (ENTITY_TYPES.category):
            component = EditionPanelCategory;
            break;
          case (ENTITY_TYPES.product):
            component = EditionPanelProduct;
            break;
          default:
            component = null;
        }

        return component;
      },
    }),
  },
  methods: {
    filterPanelToggle() { this.$store.commit(FILTER_VISIBILITY_TOGGLE); },
  },
  beforeMount() {
    this.$store.dispatch(ENTITY_ALL_LOAD());
    setTimeout(() => this.$store.commit(SPINNER_HIDE), 1000);
  },
};
</script>

<style lang="scss">
#avmax {
.page {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
}
</style>
