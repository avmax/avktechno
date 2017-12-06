<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
    :value="isEditionPanelOpened"
    disable-route-watcher
    clipped
    fixed
    app>
      <shop-entities-edition-panel v-if="isEditionPanelOpened"/>
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
import ShopEntitiesEditionPanel from '~/domains/shop/ShopEntitiesEditionPanel.vue';

export default {
  name: 'shop-entities-layout',
  components: {
    ShopEntitiesEditionPanel,
  },
  computed: {
    isEditionPanelOpened() { return !!this.$store.state.shop.entityBeingEdited; },
  },
};
</script>

<style>
@import url(../node_modules/vuetify/dist/vuetify.css);
</style>
