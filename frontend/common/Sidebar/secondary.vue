<template>
  <v-navigation-drawer
    :value="isOpened"
    class="shop-menu"
    disable-resize-watcher
    disable-route-watcher
    mobile-break-point="960"
    stateless
    touchless
    width="300"
    app
    clipped
    fixed
    left
    hide-overlay
  >
    <v-toolbar class="title pl-3" flat>
      Категории
    </v-toolbar>

    <v-divider/>

    <shop-menu/>
  </v-navigation-drawer>
</template>


<script>
import ShopMenu from '~/domains/shop/menu/base';

export default {
  components: {
    ShopMenu,
  },
  computed: {
    isOpened() { return this.$vuetify.breakpoint.mdAndUp; },
  },
};
</script>
