<template>
<v-card class="entity-item-product">
  <v-card-media class="entity-item-product__media mb-3" :src="model.imgUrl"/>
  <v-card-title class="entity-item-product__text title pt-0">{{model.name}}</v-card-title>
  <v-card-text class="entity-item-product__text subheading pt-0">Цена: {{model.price}} {{model.currency}}</v-card-text>
  <v-card-text class="entity-item-product__text subheading entity-item-product__info pt-0">Категория: {{category.name}}</v-card-text>
  <v-card-text class="entity-item-product__text subheading entity-item-product__info pt-0">Бренд: {{brand.name}}</v-card-text>
  <v-card-actions class="entity-item-product__actions pa-3">
    <v-layout wrap class="ma-0">
      <v-flex xs12 class="pa-0 mb-2">
        <v-btn
          :to="{ name: 'product-id', params: { id: model.id }}"
          nuxt
          block
          secondary
          class="entity-item-product__action-item ml-0">
          Узнать подробнее
        </v-btn>
      </v-flex>
      <v-flex xs12 class="pa-0" style="display: flex;">
        <v-btn class="entity-item-product__action-item pa-0 ma-0 mr-2"
          style="flex-grow: 1;"
          success
          @click="addToCart"
        >
          {{addToCartBtnText}}
          <template v-if="count">
            <span class="px-1" style="transform: translateY(-1px);"> | </span>{{count}}
          </template>
        </v-btn>
        <v-btn class="entity-item-product__action-item pa-0 ma-0"
          :disabled="!count"
          error
          @click="removeFromCart"
        >
          Убрать
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card-actions>
</v-card>
</template>

<script>
import Base from './base';

export default {
  name: 'entity-item-product',
  mixins: [Base],
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    model() { return this.data; },
    addToCartBtnText() {
      return this.$route.path === '/cart'
        ? 'Добавить'
        : 'В корзину';
    },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.entity-item-product {
  position: relative;
  width: 100%;
  max-width: calc(100vw - 50px);
  height: 100% !important;
  overflow: hidden;
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
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    padding-top: 0 !important;
    padding-bottom: 8px !important;
  }

  &__action-item {
    text-align: center;
    border-radius: 0;
  }
}
}
</style>
