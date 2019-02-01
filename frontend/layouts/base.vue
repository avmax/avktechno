<template>
  <v-app id="avmax">

    <div v-html="yaMetrics"></div>
    <div v-html="yaMetricsOfficial"></div>

    <the-header>
      <slot name="header" slot="header"/>
    </the-header>

      <slot name="panels"/>
      <the-sidebar/>

      <v-content class="content">
        <the-notifications/>
        <v-container fluid>
          <v-layout column fill-width>
            <v-flex>
              <nuxt/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>

    <the-footer/>
  </v-app>
</template>

<script>
import TheHeader from '~/common/Header/the.vue';
import TheFooter from '~/common/Footer/the.vue';
import TheSidebar from '~/common/Sidebar/primary.vue';
import TheNotifications from '~/common/Notification/container.vue';
import {
  ENTITY_ALL_LOAD,
  SPINNER_HIDE,
} from '~/barrel/state';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import { mapState } from 'vuex';
import yaMetrics from '../utils/ya-metrics.js';
import yaMetricsOfficial from '../utils/ya-metrics-official.js';

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
      yaMetrics,
      yaMetricsOfficial,
    };
  },
  computed: {
    ...mapState({
      isSpinner: ({ ui }) => ui.spinner,
    }),
  },
  async mounted() {
    if (!process.env.isProd) {
      await this.$store.dispatch(ENTITY_ALL_LOAD());
      this.$store.commit(SPINNER_HIDE);
    } else {
      setTimeout(() => this.$store.commit(SPINNER_HIDE), 500);
    }
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

.content {
  @media all and (max-width: 400px) {
    width: 100%;
    overflow: hidden;
  }
}
}
</style>
