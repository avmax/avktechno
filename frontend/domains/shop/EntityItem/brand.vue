<template>
<v-card class="shop-entity-item-brand card">
  <v-card-media class="card__media" :src="imgUrl"></v-card-media>
  <v-card-title class="card__title title">{{name}}</v-card-title>
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
  name: 'entity-item-brand',
  props: {
    link: Object,
    imgUrl: String,
    name: String,
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-item-brand {
  position: relative;
  width: 100%;
  height: 100%;
}
}
</style>
