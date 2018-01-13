<template>
  <v-app id="avmax" dark>
    <the-header/>

    <v-content>
      <v-container fluid fill-height>
        <v-layout column style="width: 100%;">
          <v-flex
          v-if="notifications && notifications.length"
          class="mb-3" xs12>
            <v-alert
            v-for="(notification, index) in notifications"
            :type="notification.type"
            :value="true"
            dismissible
            class="text-xs-center"
            style="width: 100%; color: black;"
            transition="slide-y-transition"
            @input="notificationClose(index)"
            :key="`index-${index}`">
              {{notification.message}}
            </v-alert>
          </v-flex>
            <nuxt/>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheHeader from '~/domains/common/TheHeader.vue';
import {
  NOTIFICATION_CLOSE,
} from '~/domains/barrel.state';
import { mapState } from 'vuex';

export default {
  name: 'layout-default',
  components: {
    TheHeader,
  },
  computed: {
    ...mapState({
      notifications: ({ ui }) => ui.notification,
    }),
  },
  methods: {
    notificationClose(index) { this.$store.commit(NOTIFICATION_CLOSE, index); },
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
