<template>
<v-card class="product-item">
  <v-card-media class="product-item__media mb-3" :height="200" :src="model.imgUrl"/>
  <v-card-title class="product-item__text title pt-0">{{model.name}}</v-card-title>
  <v-card-text class="product-item__text subheading pt-0">Цена: {{model.price}} {{model.currency}}</v-card-text>
  <v-divider class="mb-3"/>
  <v-card-text
    class="product-item__text subheading product-item__info pt-0"
  >
      Артикул: {{model.identificator}}
  </v-card-text>
  <v-card-text
    v-if="isPageCart"
    class="product-item__text subheading product-item__info pt-0"
  >
    Категория:
    <template v-if="category">
      {{category.name}}
    </template>
    <template v-else>
      отсутствует
    </template>
  </v-card-text>
  <v-card-text
    class="product-item__text subheading product-item__info pt-0"
  >
      Производитель:
      <template v-if="brand">
        {{brand.name}}
      </template>
      <template v-else>
        отсутствует
      </template>
  </v-card-text>

  <v-divider/>

  <v-card-text class="subheading" v-html="chopStr(model.descriptionShort, 150)"/>

  <v-divider/>

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
