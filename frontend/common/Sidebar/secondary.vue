<template>
  <v-navigation-drawer
    :value="isOpened"
    class="shop-menu"
    disable-resize-watcher
    disable-route-watcher
    mobile-break-point="960"
    stateless
    touchless
    width="320"
    app
    clipped
    fixed
    left
    hide-overlay
  >

    <search class="py-3"/>

    <v-toolbar class="title pl-3" flat>
      Категории
    </v-toolbar>

    <v-divider/>

    <shop-menu/>
  </v-navigation-drawer>
</template>


<script>
import ShopMenu from '~/domains/shop/Menu/base';
import Search from '~/domains/filter/Search';

export default {
  components: {
    ShopMenu,
    Search,
  },
  computed: {
    isOpened() {
      const { $vuetify, $store } = this;
      return $vuetify.breakpoint.mdAndUp && !$store.state.edition.isActive;
    },
  },
};
</script>
