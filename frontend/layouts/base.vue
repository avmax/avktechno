<template>
  <v-app id="avmax">

    <the-header>
      <slot name="header" slot="header"/>
    </the-header>

    <template v-if="!isSpinner">
      <slot name="panels"/>
      <the-sidebar/>

      <v-content>
        <the-notifications/>
        <v-container fluid>
          <v-layout column fill-width>
            <v-flex>
              <nuxt/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>

    <template v-else>
      <v-layout  row align-center justify-center>
        <grid-loader :loading="true" color="#003559"/>
      </v-layout>
    </template>

    <the-footer/>
  </v-app>
</template>

<script>
import TheHeader from '~/common/Header/the.vue';
import TheFooter from '~/common/Footer/the.vue';
import TheSidebar from '~/common/Sidebar/the.vue';
import TheNotifications from '~/common/Notification/container.vue';
import {
  ENTITY_ALL_LOAD,
  SPINNER_HIDE,
} from '~/barrel/state';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import { mapState } from 'vuex';

export default {
  name: 'layout-base',
  components: {
    TheHeader,
    TheFooter,
    TheSidebar,
    TheNotifications,
    GridLoader,
  },
  data() {
    return {
      test: false,
    };
  },
  computed: {
    ...mapState({
      isSpinner: ({ ui }) => ui.spinner,
    }),
  },
  async beforeMount() {
    await this.$store.dispatch(ENTITY_ALL_LOAD());
    this.$store.commit(SPINNER_HIDE);
    // setTimeout(() => this.$store.commit(SPINNER_HIDE), 500);
  },
};
</script>

<style lang="scss">
#avmax {
.page {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
}
</style>
