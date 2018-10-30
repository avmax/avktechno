<template>
  <v-navigation-drawer
    class="avm-sidebar"
    :value="isOpened"
    disable-resize-watcher
    disable-route-watcher
    mobile-break-point="1080"
    width="400"
    app
    clipped
    fixed
    left
    hide-overlay
  >

    <search class="pt-2"/>

    <v-list class="py-0">
      <v-list-group :value="isCatalogueOpened">
        <v-list-tile
          slot="item"
        >
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Категории</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <shop-menu/>
      </v-list-group>
    </v-list>

    <v-divider/>

    <v-list dense>
      <v-list-tile to='/product' exact>
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Товары</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to='/'>
        <v-list-tile-action>
          <v-icon>face</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>О нас</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
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
  data() {
    return {
      isCatalogueOpened: false,
    };
  },
  computed: {
    isOpened() {
      const { state } = this.$store;
      return state.ui.isSidebar && !state.edition.isActive;
    },
    menu() {
      const { getters } = this.$store;
      const categories = getters.categories;
      const items = categories.map(c => ({ ...c, isActive: false }));

      return items;
    },
  },
  methods: {
    getCategory(id) {
      const { getters } = this.$store;
      const category = getters.category;
      return category(id);
    },
  },
};
</script>


<style lang="scss">
#avmax {
.avm-sidebar {
  .list--group .list__tile {
    padding-left: 32px;
  }

  .list {
    padding-bottom: 0 !important;
  }
}
}
</style>
