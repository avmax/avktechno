<template>
<div
class="shop-entity-view-product py-2"
:class="{ 'shop-entity-view-product_loading' : !isReady }">
  <v-fade-transition>
    <v-card v-if="isReady && model" class="shop-entity-view-product__card">
      <v-card-media class="shop-entity-view-product__card-media" :src="model.imgUrl"/>
      <v-card-title class="shop-entity-view-product__card-header display-1">
        {{model.name}}
        <v-spacer/>
        <v-chip
        class="shop-entity-view-product__card-price title"
        label
        outline
        disabled
        color="white"
        v-if="model.price">
          Цена: {{model.price}} {{model.currency}}
        </v-chip>
      </v-card-title>
      <v-card-text class="shop-entity-view-product__card-title headline mb-1">
        {{model.title}}
        <v-spacer/>
        <v-btn
        class="d-inline-block shop-entity-view-product__card-action ma-0"
        v-if="!isAddedToCart"
        color="teal"
        @click="addToCart">
          Добавить в корзину
        </v-btn>
        <v-btn
        v-else
        class="d-inline-block shop-entity-view-product__card-action ma-0"
        color="red lighten-1"
        @click="removeFromCart">
          Убрать из корзины
        </v-btn>
      </v-card-text>
      <v-card-text v-if="model.description" class="shop-entity-view-product__card-description subheading" v-html="model.description"/>
      <v-divider class="my-4"/>
      <template
      v-for="(feature, index) in model.features">
        <v-card-text
        class="shop-entity-view-product__card-feature"
        :key="`feature-${index}`">
          <div class="title mt-0 mb-2" v-if="feature.title">{{feature.title}}</div>
          <v-card-text
          class="shop-entity-view-product__card-feature-item py-1 pb-"
          v-for="(f, i) in feature.items"
          :key="`feature-${index}-${i}`">
            <div class="shop-entity-view-product__card-feature-icon"></div>
            <div class="subheading">{{f}}</div>
          </v-card-text>
        </v-card-text>
        <v-divider class="my-4" :key="`feature-${index}`"/>
      </template>
      <template v-for="(c, i) in model.charachteristics">
        <v-card-text
        class="shop-entity-view-product__card-charachteristics"
        :key="`characteristics-${i}`">
          <div class="title mt-0 mb-2">{{c.title}}</div>
          <div class="shop-entity-view-product__card-charachteristics-item mt-1"
          v-for="(item, index) in c.items" :key="`characteristics-${i}-${index}`">
            <span class="shop-entity-view-product__card-charachteristics-item-key subheading">{{item.key}}:</span>
            <span class="shop-entity-view-product__card-charachteristics-item-val body-2 pl-2">{{item.val}}</span>
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

  <div
  v-if="!isReady"
  class="shop-entity-view-product__ghost">
    <div class="shop-entity-view-product__ghost-spinner">
      <grid-loader :loading="true"/>
    </div>
  </div>

  <div class="shop-entity-view-product__controls"
  v-if="isEditionEnabled">
    <v-btn
    @click="edit(type, id)"
    fab small>
      <v-icon color="white">edit</v-icon>
    </v-btn>
    <v-btn
    @click="remove(type, id)"
    fab small>
      <v-icon color="white">clear</v-icon>
    </v-btn>
  </div>
</div>
</template>

<script>
import { ENTITY_TYPES } from '~/domains/barrel.types';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import CardBase from '~/domains/common/CardBase.vue';
import { isEmpty } from 'lodash/fp';
import Editable from './Editable';
import ShopEntityProduct from './ShopEntityProduct';

export default {
  name: 'shop-entity-view-product',
  components: {
    CardBase,
    GridLoader,
  },
  mixins: [Editable, ShopEntityProduct],
  props: {
    id: {
      type: [String, Number],
      required: true,
      default: null,
    },
  },
  data() {
    return {
      type: ENTITY_TYPES.product,
      isReady: false,
    };
  },
  computed: {
    model() { return this.$store.getters.entity(this.type, this.id); },
    isEmpty() { return isEmpty(this.$store.state.shop[this.type][this.id]); },
  },
  mounted() {
    if (this.isEmpty) {
      setTimeout(() => this.isReady = true, 1000);
    } else {
      this.isReady = true;
    }
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-view-product {
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
      margin-bottom: 40px !important;
    }
  }

  &__controls {
    position: absolute;
    width: 100%;
    top: 10px;
    padding-right: 5px;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__ghost {
    position: relative;
    width: 100%;
    height: 100%;

    &-spinner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}



@media all and (max-width: 768px) {
.shop-entity-view-product {
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
  }
}
}


@media all and (min-width: 768px) {
.shop-entity-view-product {
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

    &-action {
      margin-bottom: 0px !important;
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
