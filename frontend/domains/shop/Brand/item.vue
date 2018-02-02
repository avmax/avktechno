<template>
  <v-card class="brand-item">
    <v-card-media :src="model.imgUrl" height="200"/>
    <v-card-title><strong>{{ model.name }}</strong></v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  computed: {
    model() { return this.data; },
  },
};
</script>

<style lang="scss">
.brand-item {
  .card__media__background {
    background-size: auto 100% !important;
  }
}
</style>

