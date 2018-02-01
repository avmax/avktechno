<template>
<v-toolbar app fixed clipped-left color="primary" dark>
  <v-toolbar-side-icon @click.stop="toggleSidebar" class="hidden-sm-and-up"/>
  <v-toolbar-title class="hidden-sm-and-down mr-2">АВК ТЕХНО</v-toolbar-title>
  <router-link class="link mr-3 white--text ml-3 hidden-sm-and-down" to="/">Товары</router-link>
  <router-link class="link mr-3 white--text hidden-sm-and-down" to="/contact">Контакты</router-link>
  <router-link class="link mr-3 white--text hidden-sm-and-down" to="/about">О нас</router-link>
  <v-spacer></v-spacer>

  <slot/>

  <v-btn to="/cart" nuxt flat class="mx-0">
    <v-badge right color="success" :value="itemsInCart">
      <span class="hidden-sm-and-down white--text">Корзина</span>
      <v-icon class="hidden-md-and-up" large color="grey lighten-1">shopping_cart</v-icon>
      <span slot="badge">{{itemsInCart}}</span>
    </v-badge>
  </v-btn>
</v-toolbar>
</template>

<script>
import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
  SIDEBAR_TOGGLE,
} from '~/domains/barrel.state';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      itemsInCart: ({ cart }) => {
        let sum = 0;
        Object.values(cart.items).map(item => sum += item);
        return sum;
      },
    }),
    isUserSignedIn: {
      get() { return this.$store.state.user.isSignedIn; },
      // eslint-disable-next-line
      set(v) { v ? this.$store.commit(USER_SIGN_IN, true) : this.$store.commit(USER_SIGN_OUT); },
    },
  },
  methods: {
    toggleSidebar() {
      const { commit } = this.$store;
      commit(SIDEBAR_TOGGLE);
    },
  },
};
</script>
