<template>
<v-toolbar app fixed clipped-left color="primary" dark>
  <v-toolbar-side-icon @click.stop="toggleSidebar" class="hidden-md-and-up"/>
  <v-toolbar-title class="hidden-xs-only mr-2">АВК ТЕХНО</v-toolbar-title>
  <router-link class="link mr-3 white--text ml-3 hidden-xs-only" to="/">Товары</router-link>
  <router-link class="link mr-3 white--text hidden-xs-only" to="/contact">Контакты</router-link>
  <router-link class="link mr-3 white--text hidden-xs-only" to="/about">О нас</router-link>

  <v-spacer/>

  <v-btn
    to="/cart"
    nuxt
    flat
    class="ml-0 mr-2"
  >
    <span class="hidden-xs-only white--text">Корзина</span>
    <v-icon class="hidden-sm-and-up" large color="grey lighten-1">shopping_cart</v-icon>
    <span :class="{ 'pr-1': $vuetify.breakpoint.smAndDown, 'px-2' : $vuetify.breakpoint.smAndUp }">|</span><span>{{totalPrice.RUB}} RUB</span>
  </v-btn>
</v-toolbar>
</template>

<script>
import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
  SIDEBAR_TOGGLE,
} from '~/barrel/state';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'totalPrice',
    ]),
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

<style lang="scss">
#avmax {
.badge__badge {
  width: auto;
  padding: 15px 10px;
  top: -20px;
  right: -45px;
  background-color: transparent !important;
  border-bottom: 2px solid red !important;
}
}
</style>
