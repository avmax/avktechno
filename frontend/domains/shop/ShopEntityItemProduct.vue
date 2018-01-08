<template>
<v-card class="shop-entity-item-product card">
  <template v-if="!ghost">
    <v-card-media class="card__media" :src="imgUrl"/>
    <v-card-title class="title shop-entity-item-product__header card__header pb-0">
      <div style="padding-right: 20px;">{{name}}</div>
      <div class="shop-entity-item-product__controls card__controls">
        <v-btn
        v-if="!isAddedToCart"
        @click="addToCart()"
        fab small color="teal">
          <v-icon color="white">add_shopping_cart</v-icon>
        </v-btn>
        <v-btn
        v-else
        @click="removeFromCart()"
        fab small color="red lighten-1">
          <v-icon color="white">remove_shopping_cart</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text class="subheading pb-0">Цена: {{price}} {{currency}}</v-card-text>
    <v-card-text class="subheading card__info">{{info[hiddenType]}}</v-card-text>
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
  </template>

  <template v-else>
    <v-card-media class="card__media" src="http://lorempixel.com/g/400/200/"/>
    <v-card-title class="card__title title pb-0">name</v-card-title>
    <v-card-text class="subheading pb-0">price</v-card-text>
    <v-card-text class="subheading">info</v-card-text>
    <v-card-actions><v-btn>Читать подробно</v-btn></v-card-actions>
  </template>
</v-card>
</template>

<script>
import { CART_ITEM_ADD, CART_ITEM_REMOVE } from '~/domains/barrel.state';

export default {
  name: 'shop-entity-item-product',
  props: {
    id: [Number, String],
    link: Object,
    imgUrl: String,
    name: String,
    title: String,
    info: Object,
    description: String,
    price: Number,
    currency: String,
    hiddenType: String,
    ghost: Boolean,
  },
  computed: {
    isAddedToCart() { return this.$store.state.cart.items.indexOf(this.id) !== -1; },
  },
  methods: {
    addToCart() {
      this.$store.commit(CART_ITEM_ADD, this.id);
    },
    removeFromCart() {
      this.$store.commit(CART_ITEM_REMOVE, this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-item-product {
  position: relative;
  width: 100%;

  &__header {
    position: relative;
  }
}
}
</style>
