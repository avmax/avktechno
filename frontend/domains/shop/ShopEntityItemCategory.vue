<template>
<v-card class="shop-entity-item-category card">
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
  name: 'shop-entity-item-category',
  props: {
    link: Object,
    name: String,
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-item-category {
  position: relative;
  width: 100%;
  height: 100%;
}
}
</style>
