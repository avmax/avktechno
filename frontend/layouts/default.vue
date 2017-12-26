<template>
  <v-app id="avmax" dark>
    <v-navigation-drawer
    v-model="isEditionPanelOpened"
    disable-route-watcher
    clipped
    fixed
    app>
      <the-shop-edition-panel-container v-if="isEditionPanelOpened"/>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Application</v-toolbar-title>
      <router-link class="mr-3 ml-3" to="/">Index</router-link>
      <router-link class="mr-3" to="/categories">Categories</router-link>
      <router-link class="mr-3" to="/auth">Auth</router-link>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <nuxt/>
      </v-container>
    </v-content>

    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheShopEditionPanelContainer from '~/domains/shop/TheShopEditionPanelContainer.vue';
// import { CANCEL_ENTITY_EDITION } from '~/domains/shop/shop.state';

export default {
  name: 'default-layout',
  components: {
    TheShopEditionPanelContainer,
  },
  computed: {
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
};
</script>

<style>
@import url(../node_modules/vuetify/dist/vuetify.css);

.page {
  width: 100%;
  height: 100%;
}
</style>
