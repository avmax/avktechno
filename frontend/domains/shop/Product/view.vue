<template>
<div
class="entity-view-product py-2">
  <v-fade-transition>
    <v-card v-if="model" class="entity-view-product__card">
      <v-card-media class="entity-view-product__card-media" :src="model.imgUrl"/>
      <v-card-title class="entity-view-product__card-header display-1 pb-0" style="font-weight: bolder;">
        {{model.name}}
      </v-card-title>
      <v-card-title class="display-1 pt-0">
        {{model.title}}
      </v-card-title>

      <v-divider class="mb-4"/>
      <v-card-text class="entity-view-product__card-actions headline">
        <v-chip
        class="entity-view-product__card-price title ma-0 mb-3"
        label
        outline
        disabled
        color="primary"
        v-if="model.price">
          Цена: {{model.price}} {{model.currency}}
        </v-chip>
        <v-btn
        class="d-inline-block entity-view-product__card-action ma-0"
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
        class="d-inline-block entity-view-product__card-action ma-0"
        color="red lighten-1"
        @click="removeFromCart">
          Убрать из корзины
        </v-btn>
      </v-card-text>
      <v-divider class="mb-4 mt-4"/>

      <template v-if="brand || category">
        <v-card-text
          v-if="category.name"
          class="entity-view-product__card-info-item subheading"
        >
          Категория: {{category.name}}
        </v-card-text>
        <v-card-text
          v-if="brand.name"
          class="entity-view-product__card-info-item subheading"
        >
          Бренд: {{brand.name}}
        </v-card-text>
        <v-divider class="my-4"/>
      </template>

      <template v-if="model.description">
        <v-card-text class="entity-view-product__card-description subheading" v-html="model.description"/>
        <v-divider class="my-4"/>
      </template>

      <template
      v-for="(feature, index) in model.features">
        <v-card-text
        class="entity-view-product__card-feature"
        :key="`feature-${index}`">
          <div class="title mt-0 mb-2" v-if="feature.title">{{feature.title}}</div>
          <v-card-text
          class="entity-view-product__card-feature-item py-1 pb-"
          v-for="(f, i) in feature.items"
          :key="`feature-${index}-${i}`">
            <div class="entity-view-product__card-feature-icon"></div>
            <div class="subheading">{{f}}</div>
          </v-card-text>
        </v-card-text>
        <v-divider class="my-4" :key="`feature-${index}`"/>
      </template>

      <template v-for="(c, i) in model.charachteristics">
        <v-card-text
        class="entity-view-product__card-charachteristics"
        :key="`characteristics-${i}`">
          <div class="title mt-0 mb-2">{{c.title}}</div>
          <div class="entity-view-product__card-charachteristics-item mt-1"
          v-for="(item, index) in c.items" :key="`characteristics-${i}-${index}`">
            <span class="entity-view-product__card-charachteristics-item-key subheading">{{item.key}}:</span>
            <span class="entity-view-product__card-charachteristics-item-val body-2 pl-2">{{item.val}}</span>
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
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import CardBase from '~/domains/common/CardBase.vue';
import { isEmpty } from 'lodash/fp';
import Base from './base';

export default {
  name: 'entity-view-product',
  components: {
    CardBase,
    GridLoader,
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
.entity-view-product {
  position: relative;
  width: 100%;
  height: 100%;

  &__card {
    .title {
      line-height: 1.4em !important;
    }

    &-media {
      height: 200px !important;
      background-color: white;

      .card__media__background {
        background-size: 100% 100% !important;
      }
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
.entity-view-product {
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
.entity-view-product {
  max-width: 720px;
  margin: 0 auto;

  &__card {
    &-media {
      height: 400px !important;
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
      margin-bottom: 0px !important;
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
