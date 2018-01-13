<template>
  <v-app id="avmax" dark>
    <the-header>
      <v-btn style="width: 40px; min-width: 40px;" @click.native="filterPanelToggle" flat class="mr-3">
        <v-icon large color="grey lighten-1">sort</v-icon>
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
        <filter-panel></filter-panel>
      </v-navigation-drawer>

      <v-content>
        <v-container fluid fill-height>
          <v-layout column style="width: 100%;">
            <v-flex
            v-if="notifications && notifications.length"
            class="mb-3" xs12>
              <v-alert
              v-for="(notification, index) in notifications"
              :type="notification.type"
              :value="true"
              dismissible
              class="text-xs-center"
              style="width: 100%; color: black;"
              transition="slide-y-transition"
              @input="notificationClose(index)"
              :key="`index-${index}`">
                {{notification.message}}
              </v-alert>
            </v-flex>
              <nuxt/>
          </v-layout>
        </v-container>
      </v-content>
    </template>

    <template v-else>
      <v-layout fill-height row align-center justify-center>
        <grid-loader :loading="true" color="teal"/>
      </v-layout>
    </template>

    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheHeader from '~/domains/common/TheHeader.vue';
import {
  NOTIFICATION_CLOSE,
  ENTITY_LOAD,
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
      notifications: ({ ui }) => ui.notification,
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
    notificationClose(index) { this.$store.commit(NOTIFICATION_CLOSE, index); },
    filterPanelToggle() { this.$store.commit(FILTER_VISIBILITY_TOGGLE); },
  },
  beforeMount() {
    this.$store.dispatch(ENTITY_LOAD());
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
