<template>
  <v-app id="avmax" dark>
    <v-navigation-drawer
    v-model="isEditionPanelOpened"
    disable-resize-watcher
    disable-route-watcher
    mobile-break-point="1080"
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
      <!-- <router-link class="mr-3" to="/auth">Auth</router-link> -->
      <v-layout row justify-end align-center>
        <v-flex xs2 align-center>
          <v-switch
          :label="`${isUserSignedIn ? 'Выйти' : 'Войти'}`"
          v-model="isUserSignedIn"
          style="height: 30px;"/>
        </v-flex>
      </v-layout>
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
            <v-container fill-height class="pa-0">
              <nuxt/>
            </v-container>
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
import { ENTITY_TYPES, NOTIFICATION_CLOSE, USER_SIGN_IN, USER_SIGN_OUT } from '~/domains/shop/state.shop';
import ShopEditionPanelCategory from '~/domains/shop/ShopEditionPanelCategory.vue';
import ShopEditionPanelBrand from '~/domains/shop/ShopEditionPanelBrand.vue';
import ShopEditionPanelProduct from '~/domains/shop/ShopEditionPanelProduct.vue';

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
      get() { return this.$store.state.shop.edition.isEnabled; },
      set() { },
    },
    isUserSignedIn: {
      get() { return this.$store.state.user.isSignedIn; },
      // eslint-disable-next-line
      set(v) { v ? this.$store.commit(USER_SIGN_IN, true) : this.$store.commit(USER_SIGN_OUT); },
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
