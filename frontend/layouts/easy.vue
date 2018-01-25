<template>
  <v-app id="avmax" dark>

    <the-header/>

    <v-content>
      <the-notifications/>
      <nuxt/>
    </v-content>

    <the-footer/>

  </v-app>
</template>

<script>
import TheHeader from '~/domains/common/TheHeader.vue';
import TheFooter from '~/domains/common/TheFooter.vue';
import TheNotifications from '~/domains/common/TheNotifications.vue';

export default {
  name: 'layout-default',
  components: {
    TheHeader,
    TheFooter,
    TheNotifications,
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
