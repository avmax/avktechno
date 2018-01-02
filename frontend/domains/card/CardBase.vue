<template>
<v-card class="avm-card">
  <v-card-media class="avm-card__media" :src="imgUrl"></v-card-media>
  <v-card-title class="avm-card__title">{{name}}</v-card-title>
  <v-card-text class="avm-card__text">{{title}}</v-card-text>
</v-card>
</template>



<script>
export default {
  name: 'card-base',
  props: {
    imgUrl: String,
    name: String,
    title: String,
  },
};
</script>



<style>
.avm-card {
  text-align: left;

  &__media {
    height: 200px !important;
    background-color: pink;
  }
}
</style>
