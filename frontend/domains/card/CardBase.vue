<template>
<v-card class="card">
  <v-card-media class="card__media" :src="imgUrl"></v-card-media>
  <v-card-title class="card__title">{{name}}</v-card-title>
  <v-card-text class="card__text">{{title}}</v-card-text>
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
#avmax {
.card {
  text-align: left;

  &__media {
    height: 200px !important;
    background-color: pink;
  }
}
}
</style>
