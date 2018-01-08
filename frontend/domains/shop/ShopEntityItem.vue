<template>
<div
class="shop-entity-item"
:class="{ 'shop-entity-item_loading' : isLoading }">
  <div v-if="isLoading"
  class="shop-entity-item__ghost">
    <card-base
    class="shop-entity-item__ghost-card" name="mock" title="mock"/>
    <div class="shop-entity-item__ghost-spinner">
      <grid-loader :loading="true"/>
    </div>
  </div>

  <v-fade-transition>
    <card-base
    v-if="!isLoading && model"
    :name="model.name"
    :title="model.title"
    :price="model.price"
    :currency="model.currency"
    :imgUrl="model.imgUrl"
    :link="{ name: `${type}-id`, params: { id: model.id }}"
    />
  </v-fade-transition>

  <div v-if="!isLoading" class="shop-entity-item__controls">
    <template v-if="isEditionEnabled">
      <v-btn
      @click="edit()"
      fab small>
        <v-icon color="white">edit</v-icon>
      </v-btn>
      <v-btn
      @click="remove()"
      fab small>
        <v-icon color="white">clear</v-icon>
      </v-btn>
    </template>
    <template v-else>
      <v-btn
      v-if="!isAddedToCart"
      @click="addToCart()"
      fab small>
        <v-icon color="white">add_shopping_cart</v-icon>
      </v-btn>
      <v-btn
      v-else
      @click="removeFromCart()"
      fab small>
        <v-icon color="white">remove_shopping_cart</v-icon>
      </v-btn>
    </template>
  </div>
</div>
</template>

<script>
import { CART_ITEM_ADD, CART_ITEM_REMOVE } from '~/domains/barrel.state';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import CardBase from '~/domains/common/CardBase.vue';
import { EditableDumb } from './Editable';

export default {
  name: 'shop-entity-item',
  components: {
    CardBase,
    GridLoader,
  },
  mixins: [EditableDumb],
  props: {
    type: {
      type: String,
      required: true,
      default: null,
    },
    isLoading: Boolean,
    model: Object,
    isEditionEnabled: Boolean,
  },
  computed: {
    isAddedToCart() { return this.$store.state.cart.items.indexOf(this.model.id) !== -1; },
  },
  methods: {
    addToCart() {
      this.$store.commit(CART_ITEM_ADD, this.model.id);
    },
    removeFromCart() {
      this.$store.commit(CART_ITEM_REMOVE, this.model.id);
    },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-item {
  position: relative;
  width: 100%;
  height: 100%;

  &__controls {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__ghost {
    position: relative;
    width: 100%;
    height: 100%;

    &-card {
      opacity: 0;
    }

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
}
</style>
