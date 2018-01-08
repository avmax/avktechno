<template>
<v-layout class="shop-entity-exposition" column>
  <template v-if="!isLoading">

    <div class="shop-entity-exposition__header">
      <v-switch
      v-if="invert"
      :label="`Сортировать по: ${!isInverted ? invert.false : invert.true}`"
      v-model="isInverted"
      @change="handleInvert"/>
    </div>

    <v-flex v-if="isEditionAvailable" xs12>
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
    </v-flex>

    <v-flex v-for="c in model" :key="c.model.id" xs12 class="mb-4">
      <shop-entity-collection
      v-if="!isLoading"
      class="shop-entity-exposition__collection"
      :title="c.model.title"
      :name="c.model.name"
      :link="{ name: `${type}-id`, params: { id: c.model.id }}">
        <div class="ml-2 d-inline-block" slot="header"
        v-if="isEditionEnabled">
          <v-btn @click="edit(type, c.model.id)" fab small>
            <v-icon color="white">edit</v-icon>
          </v-btn>
          <v-btn @click="remove(type, c.model.id)" fab small>
            <v-icon color="white">clear</v-icon>
          </v-btn>
        </div>
        <v-flex v-if="isEditionAvailable" xs12 md4 lg3>
          <div class="shop-entity-exposition__ghost">
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
        <v-flex v-for="s in c.items" :key="s.id" xs12 md4 lg3>
          <div class="shop-entity-exposition__item">
            <component
            :is="itemComponent"
            v-bind="s"
            :link="{ name: `${subtype}-id`, params: { id: s.id }}"
            :hiddenType="unusedType"/>
            <div v-if="!isLoading && isEditionEnabled" class="shop-entity-exposition__item-controls">
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
      <v-divider/>
    </v-flex>
  </template>

  <template v-else>
    <v-layout fill-height row align-center justify-center>
      <grid-loader :loading="true"/>
    </v-layout>
  </template>
</v-layout>
</template>

<script>
import { ENTITY_TYPES } from '~/domains/barrel.types';
import ShopEntityCollection from '~/domains/shop/ShopEntityCollection.vue';
import ShopEntityItemProduct from '~/domains/shop/ShopEntityItemProduct.vue';
import ShopEntityItemBrand from '~/domains/shop/ShopEntityItemBrand.vue';
import ShopEntityItemCategory from '~/domains/shop/ShopEntityItemCategory.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import Editable from './Editable';

export default {
  name: 'shop-entity-exposition',
  components: {
    ShopEntityCollection,
    ShopEntityItemProduct,
    ShopEntityItemBrand,
    ShopEntityItemCategory,
    GridLoader,
  },
  mixins: [Editable],
  props: {
    type: {
      type: String,
      required: true,
    },
    subtype: {
      type: String,
      required: true,
    },
    data: Array,
    invert: Object,
  },
  data() {
    return {
      isLoading: true,
      isLoadingItems: true,
      isInverted: false,
    };
  },
  computed: {
    collections() {
      let collections = this.$store.getters.entities(this.type);
      collections = collections.map((id) => {
        const collectionModel = this.$store.getters.entity(this.type, id);
        const collection = {
          model: collectionModel,
          items: collectionModel.refs[this.subtype]
            .map(id => this.$store.getters.entity(this.subtype, id)),
        };

        return collection;
      });

      return collections;
    },
    model() { return this.data || this.collections; },
    unusedType() {
      return Object.values(ENTITY_TYPES).filter(v => v !== this.type && v !== this.subtype)[0];
    },
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
  mounted() {
    setTimeout(() => this.isLoading = false, 500);
    setTimeout(() => this.isLoadingItems = false, 1000);
  },
  methods: {
    handleInvert() { this.$emit('invert', this.isInverted); },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-exposition {
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
  }
}
}
</style>

