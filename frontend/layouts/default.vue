<template>
  <v-app id="avmax" dark>
    <v-navigation-drawer
    v-model="isEditionPanelOpened"
    disable-route-watcher
    clipped
    fixed
    app>
      <component :is="editionPanel"/>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Application</v-toolbar-title>
      <router-link class="mr-3 ml-3" to="/">Index</router-link>
      <router-link class="mr-3" to="/categories">Categories</router-link>
      <router-link class="mr-3" to="/brands">Brands</router-link>
      <router-link class="mr-3" to="/auth">Auth</router-link>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout column>
          <v-flex
          v-if="notifications && notifications.length"
          xs12>
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
          <v-flex xs12>
            <nuxt/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { NOTIFICATION_CLOSE } from '~/domains/common/state.notification';
import { ENTITY_TYPES } from '~/domains/shop/state.shop';
import ShopEditionPanelCategory from '~/domains/shop/ShopEditionPanelCategory.vue';
import ShopEditionPanelBrand from '~/domains/shop/ShopEditionPanelBrand.vue';
import ShopEditionPanelProduct from '~/domains/shop/ShopEditionPanelProduct.vue';
// import { CANCEL_ENTITY_EDITION } from '~/domains/shop/shop.state';

export default {
  name: 'default-layout',
  components: {
    ShopEditionPanelCategory,
    ShopEditionPanelBrand,
    ShopEditionPanelProduct,
  },
  computed: {
    ...mapState({
      notifications: ({ notification }) => notification.items,
      editionPanel({ shop }) {
        let component;
        switch (shop.edition.entityType) {
          case (ENTITY_TYPES.brand):
            component = ShopEditionPanelBrand;
            break;
          case (ENTITY_TYPES.category):
            component = ShopEditionPanelCategory;
            break;
          case (ENTITY_TYPES.product):
            component = ShopEditionPanelProduct;
            break;
          default:
            component = null;
        }

        return component;
      },
    }),
    isEditionPanelOpened: {
      get() {
        return this.$store.state.shop.edition.isEnabled;
      },
      set(v) {
        if (!v) {
          // this.$store.commit(`shop/${CANCEL_ENTITY_EDITION}`);
        }
      },
    },
  },
  methods: {
    notificationClose(index) { this.$store.commit(NOTIFICATION_CLOSE, index); },
  },
};
</script>

<style>
@import url(../node_modules/vuetify/dist/vuetify.css);

.page {
  width: 100%;
  height: 100%;
}
</style>
