<template>
<div
  class="product-view py-2"
>
  <v-fade-transition>
    <v-card v-if="model" class="product-view__card">
      <v-card-media class="product-view__card-media" :src="model.imgUrl"/>
      <v-card-title class="product-view__card-header pb-3" style="font-weight: bolder; font-size: 28px;">
        {{model.name}}
      </v-card-title>

      <v-divider/>
      <v-card-title v-if="model.title" class="title">
        {{model.title}}
      </v-card-title>
      <v-card-text class="product-view__card-actions headline pt-0">
        <div
        class="product-view__card-price title mx-0 mb-3 d-block secondary--text"
        label
        outline
        disabled
        color="primary"
        v-if="model.price">
          Цена:
          <br class="hidden-sm-and-up"> {{model.prices.RUB}} RUB <span class="hidden-xs-only">|</span>
          <br class="hidden-sm-and-up"> {{model.prices.USD}} USD <span class="hidden-xs-only">|</span>
          <br class="hidden-sm-and-up"> {{model.prices.EUR}} EUR
        </div>
        <v-btn
        class="d-inline-block product-view__card-action ma-0"
        color="success"
        dark
        @click="addToCart">
          Добавить в корзину
          <template v-if="count">
            <span class="px-1" style="transform: translateY(-1px);"> | </span>{{count}}
          </template>
        </v-btn>
        <v-btn
        :disabled="!count"
        class="d-inline-block product-view__card-action ma-0 black--text"
        color="red lighten-1"
        @click="removeFromCart">
          Убрать из корзины
        </v-btn>
      </v-card-text>
      <v-divider class="mb-4 mt-4"/>

      <v-card-text
        class="product-view__card-info-item title pb-0"
      >
        <span>Артикул:</span> <span style="font-weight: normal;"> {{model.identificator}}</span>
      </v-card-text>
      <v-card-text
        v-if="category.name"
        class="product-view__card-info-item title pb-0"
      >
        <span>Категория:</span> <span style="font-weight: normal;"> {{category.name}}</span>
      </v-card-text>
      <v-card-text
        class="product-view__card-info-item title"
      >
        <span>Производитель:</span> <span style="font-weight: normal;"> {{brand && brand.name || 'не указан'}}</span>
      </v-card-text>
      <v-divider class="my-4"/>


      <template>
        <v-card-text class="title pb-0">Описание:</v-card-text>
        <v-card-text class="product-view__card-description subheading" v-html="model.description"/>
        <v-divider class="my-4"/>
      </template>

      <template
      v-for="(feature, index) in model.features">
        <v-card-text
        class="product-view__card-feature"
        :key="`feature-${index}`">
          <div class="title mt-0 mb-2" v-if="feature.title">{{feature.title}}</div>
          <v-card-text
          class="product-view__card-feature-item py-1 pb-"
          v-for="(f, i) in feature.items"
          :key="`feature-${index}-${i}`">
            <div class="product-view__card-feature-icon"></div>
            <div class="subheading">{{f}}</div>
          </v-card-text>
        </v-card-text>
        <v-divider class="my-4" :key="`feature-${index}`"/>
      </template>

      <template v-for="(c, i) in model.charachteristics">
        <v-card-text
        class="product-view__card-charachteristics"
        :key="`characteristics-${i}`">
          <div class="title mt-0 mb-2">{{c.title}}</div>
          <div class="product-view__card-charachteristics-item mt-1"
          v-for="(item, index) in c.items" :key="`characteristics-${i}-${index}`">
            <span class="product-view__card-charachteristics-item-key subheading">{{item.key}}:</span>
            <span class="product-view__card-charachteristics-item-val body-2 pl-2">{{item.val}}</span>
          </div>
        </v-card-text>
        <v-divider class="my-4" :key="`characteristics-${i}`"/>
      </template>

      <template v-if="model.footer">
        <v-card-text class="title pb-0">{{model.footer.title}}</v-card-text>
        <v-card-text v-html="model.footer.text"/>
      </template>

    </v-card>
  </v-fade-transition>
</div>
</template>

<script>
import CardBase from '~/common/Card/base.vue';
import { isEmpty } from 'lodash/fp';
import Base from './base';

export default {
  name: 'product-view',
  components: {
    CardBase,
  },
  mixins: [Base],
  props: {
    id: {
      type: [String, Number],
      required: true,
      default: null,
    },
  },
  computed: {
    isEmpty() { return isEmpty(this.$store.state.shop.product[this.id]); },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.product-view {
  position: relative;
  width: 100%;
  height: 100%;

  &__card {
    .title {
      line-height: 1.4em !important;
    }

    &-media {
      height: 200px !important;
      background-color: black;
    }

    &-title {
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-start;
      justify-content: center;
    }

    &-description {
      font-weight: 400;
    }

    .card__text {
      white-space: normal;
    }

    &-price {
      margin-top: 15px;
    }

    &-action {
      margin-bottom: 20px !important;
    }
  }
}



@media all and (max-width: 768px) {
.product-view {
  &__card {
    &-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .display-1 {
      font-size: 22px !important;
      line-height: 34px !important;
    }

    .headline {
      font-size: 18px !important;
      line-height: 25px !important;
    }

    &-actions {
      padding-bottom: 0px !important;
    }
  }
}
}


@media all and (min-width: 768px) {
.product-view {
  &__card {
    &-media {
      height: 300px !important;
    }

    &-header {
      justify-content: center;
    }

    &-title {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px !important;
    }

    &-actions {
      padding-bottom: 16px !important;
    }

    &-price {
      margin-bottom: 15px !important;
      margin-right: 16px !important;
    }

    &-action {
      margin-right: 16px !important;
      margin-bottom: 0px !important;
      border-radius: 0;
    }

    &-feature {
      &-item {
        display: flex;
        align-items: center;
      }

      &-icon {
        width: 30px;
        min-width: 30px;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &::before {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 100%;
          background: #303030;
        }
      }
    }

    &-charachteristics {
      display: inline-block;
      padding-right: 20px;

      &-item {
        &-key {
          padding-bottom: 3px;
          border-bottom: 1px solid;
        }
      }
    }
  }
}
}
}
</style>
