<template>
<v-layout class="shop-entity-exposition" column>

  <v-layout v-if="(!model || !model.length) && !isEditionAvailable" justify-center align-center>
    <div class="display-1 text-xs-center my-4">Страница пуста</div>
  </v-layout>
  <div v-if="(!model || !model.length) && isEditionAvailable" class="display-1 text-xs-center my-4">Страница пуста</div>

  <template v-if="isEditionAvailable">
    <div class="shop-entity-exposition__ghost my-3">
      <component :is="itemComponent" ghost/>
      <div class="shop-entity-exposition__ghost-controls">
        <v-btn
        v-if="isEditionEnabled"
        @click="add(type)"
        fab large>
          <v-icon>add</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider v-if="model && model.length" class="mb-4 mt-5"/>
  </template>

  <template v-for="(c, index) in model">
    <shop-entity-collection
    class="shop-entity-exposition__collection"
    :title="c.model.title"
    :name="c.model.name"
    :link="{ name: `${type}-id`, params: { id: c.model.id }}"
    :key="c.model.id">
      <div class="ml-2 d-inline-block" slot="header"
      v-if="isEditionEnabled">
        <v-btn @click="edit(type, c.model.id)" fab small>
          <v-icon color="white">edit</v-icon>
        </v-btn>
        <v-btn @click="remove(type, c.model.id)" fab small>
          <v-icon color="white">clear</v-icon>
        </v-btn>
      </div>
      <v-flex v-if="isEditionAvailable" xs12 sm6 md4 lg3>
        <div class="shop-entity-exposition__ghost shop-entity-exposition__ghost_type_item">
          <component :is="itemComponent" ghost/>
          <div class="shop-entity-exposition__ghost-controls">
            <v-btn
            v-if="isEditionEnabled"
            @click="add(subtype, type, c.model.id)"
            fab large>
              <v-icon>add</v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>
      <v-flex v-for="s in c.items" :key="s.id" xs12 sm6 md4 lg3>
        <div class="shop-entity-exposition__item">
          <component
          :is="itemComponent"
          v-bind="s"
          :link="{ name: `${subtype}-id`, params: { id: s.id }}"/>
          <div v-if="isEditionEnabled" class="shop-entity-exposition__item-controls">
            <v-btn
            @click="edit(subtype, s.id)"
            fab small>
              <v-icon color="white">edit</v-icon>
            </v-btn>
            <v-btn
            @click="remove(subtype, s.id)"
            fab small>
              <v-icon color="white">clear</v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>
    </shop-entity-collection>
    <v-divider :key="c.model.id" v-if="index > 0" class="mb-4 mt-5"/>
  </template>
</v-layout>
</template>

<script>
import { ENTITY_TYPES } from '~/domains/barrel.types';
import ShopEntityCollection from '~/domains/shop/ShopEntityCollection.vue';
import ShopEntityItemProduct from '~/domains/shop/ShopEntityItemProduct.vue';
import ShopEntityItemBrand from '~/domains/shop/ShopEntityItemBrand.vue';
import ShopEntityItemCategory from '~/domains/shop/ShopEntityItemCategory.vue';
import Editable from './Editable';

export default {
  name: 'shop-entity-exposition',
  components: {
    ShopEntityCollection,
    ShopEntityItemProduct,
    ShopEntityItemBrand,
    ShopEntityItemCategory,
  },
  mixins: [Editable],
  props: {
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    subtype: {
      type: String,
      required: true,
    },
  },
  computed: {
    model() { return this.data; },
    itemComponent() {
      let cmp;
      switch (this.subtype) {
        case (ENTITY_TYPES.product):
          cmp = ShopEntityItemProduct;
          break;
        case (ENTITY_TYPES.category):
          cmp = ShopEntityItemCategory;
          break;
        case (ENTITY_TYPES.brand):
          cmp = ShopEntityItemBrand;
          break;
        default:
          cmp = ShopEntityItemProduct;
      }

      return cmp;
    },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-exposition {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  &__item {
    position: relative;

    &-controls {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  &__ghost {
    position: relative;

    &-controls {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &_type_item {
      height: 100%;
    }
  }
}
}
</style>
