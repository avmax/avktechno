<template>
<v-toolbar app fixed clipped-left>
  <v-toolbar-title class="hidden-sm-and-down">АВК-ТЕХНО</v-toolbar-title>
  <router-link class="link mr-3 ml-3" to="/">Главная</router-link>
  <router-link class="link mr-3" to="/product">Продукты</router-link>
  <v-spacer></v-spacer>

  <slot/>

  <router-link to="/cart" nuxt flat class="mr-4">
    <v-badge right :value="itemsInCart">
      <span class="hidden-sm-and-down link link_uppercase">Корзина</span>
      <v-icon class="hidden-md-and-up" large color="grey lighten-1">shopping_cart</v-icon>
      <span slot="badge">{{itemsInCart}}</span>
    </v-badge>
  </router-link>
</v-toolbar>
</template>

<script>
import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
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
};
</script>
