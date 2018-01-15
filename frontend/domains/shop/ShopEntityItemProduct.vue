<template>
<v-card class="shop-entity-item-product card">
  <template v-if="!ghost">
    <v-card-media class="card__media mb-3" :src="imgUrl"/>
    <v-card-title class="card__text title pt-0">{{name}}</v-card-title>
    <v-card-text class="card__text subheading pt-0">Цена: {{price}} {{currency}}</v-card-text>
    <v-card-text class="card__text subheading card__info pt-0">{{info}}</v-card-text>
    <v-card-actions class="shop-entity-item-product__actions">
      <v-layout wrap>
        <v-flex xs12 class="pa-0">
          <v-btn :to="link" nuxt class="shop-entity-item-product__action-item mb-2">
            Узнать подробнее
          </v-btn>
        </v-flex>
        <v-flex xs12 class="pa-0 pb-3">
          <v-btn class="shop-entity-item-product__action-item"
          v-if="!isAddedToCart"
          color="teal"
          @click="addToCart">
            Добавить в корзину
          </v-btn>
          <v-btn class="shop-entity-item-product__action-item"
          v-else
          color="red lighten-1"
          @click="removeFromCart">
            Убрать из корзины
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </template>

  <template v-else>
    <v-card-media class="card__media" src="http://lorempixel.com/g/400/200/"/>
    <v-card-title class="card__title title pb-0">name</v-card-title>
    <v-card-text class="subheading pb-0">price</v-card-text>
    <v-card-text class="subheading">info</v-card-text>
    <v-card-actions>
      <v-layout wrap>
        <v-flex xs12 class="pa-0 pb-3">
          <v-btn block>Читать подробно</v-btn>
        </v-flex>
        <v-flex xs12 class="pa-0 pb-3">
          <v-btn block>Добавить в корзину</v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </template>
</v-card>
</template>

<script>
import ShopEntityProduct from './ShopEntityProduct';

export default {
  name: 'shop-entity-item-product',
  mixins: [ShopEntityProduct],
  props: {
    id: [Number, String],
    link: Object,
    imgUrl: String,
    name: String,
    info: String,
    price: [Number, String],
    currency: String,
    ghost: Boolean,
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-item-product {
  position: relative;
  width: 100%;
  max-width: calc(100vw - 50px);
  height: 100% !important;
  overflow: hidden;

  &__header {
    position: relative;
  }

  &__name {
    width: 100%;
    padding-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__actions {
    overflow: hidden;
  }

  &__action-item {
    width: 100%;
    text-align: center;
  }
}
}
</style>
