<template>
  <v-app id="avmax" dark>
    <v-navigation-drawer
    v-model="isEditionPanelOpened"
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

    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>АВК-ТЕХНО</v-toolbar-title>
      <router-link class="link mr-3 ml-3" to="/">Главная</router-link>
      <router-link class="link mr-3" to="/category">Категории</router-link>
      <router-link class="link mr-3" to="/brand">Бренды</router-link>
      <v-spacer></v-spacer>
      <router-link class="mr-5" to="/cart">
        <v-badge right v-model="itemsInCart">
            <span slot="badge">{{itemsInCart}}</span>
            <v-icon large color="grey lighten-1">shopping_cart</v-icon>
          </v-badge>
      </router-link>
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
import {
  ENTITY_LOAD,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  NOTIFICATION_CLOSE,
} from '~/domains/barrel.state';
import { ENTITY_TYPES } from '~/domains/barrel.types';
import EditionPanelCategory from '~/domains/edition/EditionPanelCategory.vue';
import EditionPanelBrand from '~/domains/edition/EditionPanelBrand.vue';
import EditionPanelProduct from '~/domains/edition/EditionPanelProduct.vue';

export default {
  name: 'default-layout',
  components: {
    EditionPanelCategory,
    EditionPanelBrand,
    EditionPanelProduct,
  },
  computed: {
    ...mapState({
      notifications: ({ ui }) => ui.notification,
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
    isEditionPanelOpened: {
      get() { return this.$store.state.edition.isEnabled; },
      set() { },
    },
    isUserSignedIn: {
      get() { return this.$store.state.user.isSignedIn; },
      // eslint-disable-next-line
      set(v) { v ? this.$store.commit(USER_SIGN_IN, true) : this.$store.commit(USER_SIGN_OUT); },
    },
    itemsInCart: {
      get() { return this.$store.state.cart.items.length; },
      set() { },
    },
  },
  async beforeMount() {
    await this.$store.dispatch(ENTITY_LOAD());
  },
  methods: {
    notificationClose(index) { this.$store.commit(NOTIFICATION_CLOSE, index); },
  },
};
</script>

<style lang="scss">
#avmax {
.page {
  width: 100%;
  height: 100%;
}
}
</style>
