<template>
<v-layout class="the-notifications" column>
  <v-alert
  v-for="(notification, index) in notifications"
  :type="notification.type"
  :value="true"
  dismissible
  class="text-xs-center"
  :class="{ 'mt-0': index === 0, 'mb-4': index === notifications.length - 1 }"
  style="width: 100%; color: black;"
  transition="slide-y-transition"
  @input="notificationClose(index)"
  :key="`index-${index}`">
    {{notification.message}}
  </v-alert>
</v-layout>
</template>

<script>
import {
  NOTIFICATION_CLOSE,
} from '~/barrel/state';
import { mapState } from 'vuex';

export default {
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
