<template>
<v-card class="card">
  <v-card-media class="card__media" :src="imgUrl"></v-card-media>
  <v-card-title class="card__title title">{{name}}</v-card-title>
  <v-card-text v-if="price" class="subheading">Цена: {{price}} {{currency}}</v-card-text>
  <v-card-text v-else>&nbsp;</v-card-text>
  <v-card-text v-if="title">{{title}}</v-card-text>
  <v-card-text v-if="description">{{description}}</v-card-text>
  <v-card-actions>
    <v-spacer/>
    <router-link v-if="link" :to="link" class="link card__go">
      <v-btn>
        Читать подробно
      </v-btn>
    </router-link>
  </v-card-actions>
</v-card>
</template>



<script>
export default {
  name: 'card-base',
  props: {
    link: Object,
    imgUrl: String,
    name: String,
    title: String,
    description: String,
    price: Number,
    currency: String,
  },
};
</script>



<style land="scss" scoped>
#avmax {
.card {
  text-align: left;
  width: 100%;
  height: 100%;

  &__media {
    height: 200px !important;
    background-color: white;

    &__background {
      background-size: 100% 100% !important;
    }
  }

  &__text {
    padding-top: 0;
  }

  &__go {
    &::before, &::after {
      display: none;
    }
  }
}
}
</style>
