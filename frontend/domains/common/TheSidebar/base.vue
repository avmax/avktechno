<template>
  <v-navigation-drawer class="sidebar"
    clipped
    fixed
    v-model="isOpened"
    app
    :disable-resize-watcher="$vuetify.breakpoint.smAndUp"
    hide-overlay
  >
    <v-list dense>
      <v-list-tile to='/' exact>
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Товары</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to='/contact'>
        <v-list-tile-action>
          <v-icon>contacts</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Контакты</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to='/about'>
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
import { SIDEBAR_SET } from '~/domains/barrel.state';

export default {
  computed: {
    isOpened: {
      get() { return this.$store.state.ui.isSidebar; },
      set(v) { this.$store.commit(SIDEBAR_SET, v); },
    },
  },
};
</script>
