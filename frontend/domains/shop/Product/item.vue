<template>
<v-card class="product-item" nuxt :to="{ name: 'product-id', params: { id: model.id }}">
  <v-card-media class="product-item__media mb-3" :height="150" :src="model.imgUrl"/>
  <v-card-title class="product-item__text product-item__text_title title pt-0">{{model.name}}</v-card-title>
  <v-card-text class="product-item__text subheading pt-0 pb-1">Цена: {{computedPrice}}</v-card-text>
  <v-divider class="mb-1"/>
  <v-card-text
    class="product-item__text subheading product-item__info py-0"
  >
      Артикул: {{model.identificator}}
  </v-card-text>
  <v-card-text
    v-if="isPageCart"
    class="product-item__text subheading product-item__info py-0"
  >
    Категория:
    <template v-if="category">
      {{category.name}}
    </template>
    <template v-else>
      не указана
    </template>
  </v-card-text>
  <v-card-text
    class="product-item__text subheading product-item__info py-0"
  >
      Производитель:
      <template v-if="brand">
        {{brand.name}}
      </template>
      <template v-else>
        не указан
      </template>
  </v-card-text>

  <v-divider/>

  <!-- <v-card-text class="subheading" v-html="chopStr(model.descriptionShort, 150)"/> -->

  <v-divider mb-1/>

  <v-card-actions class="product-item__actions pa-3">
    <v-layout wrap class="ma-0">
      <v-flex xs12 class="pa-0 mb-2">
        <v-btn
          :to="{ name: 'product-id', params: { id: model.id }}"
          nuxt
          block
          secondary
          class="product-item__action-item ml-0">
          Узнать подробнее
        </v-btn>
      </v-flex>
      <v-flex xs12 class="pa-0" style="display: flex;">
        <v-btn class="product-item__action-item pa-0 ma-0 mr-2"
          style="flex-grow: 1;"
          success
          @click="addToCart"
        >
          {{addToCartBtnText}}
          <template v-if="count">
            <span class="px-1" style="transform: translateY(-1px);"> | </span>{{count}} шт.
          </template>
        </v-btn>
        <v-btn class="product-item__action-item pa-0 ma-0"
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
  name: 'product-item',
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
    isPageCart() { return this.$route.path === '/cart'; },
    addToCartBtnText() { return this.isPageCart ? 'Добавить' : 'В корзину'; },
    computedPrice() {
      const { model } = this;
      const actualPrice = +model.price ? `${model.price} ${model.currency}` : 'Не указана';
      return actualPrice;
    },
  },
  methods: {
    chopStr(str, length) {
      const l = str.length;
      let res;

      if (l >= length) {
        res = `${str.substring(1, length)}...`;
      } else {
        const d = Math.round((length - l) / 2);
        const str2 = new Array(d + 1).join('a ');
        res = str.concat(`<span style="opacity: 0;">${str2}</span>`);
      }
      return res;
    },
  },
};
</script>

<style lang="scss">
#avmax {
.product-item {
  position: relative;
  width: 100%;
  max-width: calc(100vw - 50px);
  height: 100% !important;
  overflow: hidden;
  text-align: left;
  width: 100%;
  height: 100%;

  &__text {
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    font-size: 14px !important;

      &_title {
        height: 60px !important;
        font-size: 16px !important;
      }
  }

  &__action-item {
    text-align: center;
    border-radius: 0;
    font-size: 12px !important;

    .btn__content {
      padding: 0 !important;
    }
  }
}
}
</style>
