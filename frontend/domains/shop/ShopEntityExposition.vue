<template>
<v-layout class="shop-entity-exposition" column>
  <template v-if="!isLoading">
    <div class="shop-entity-exposition__header">
      <v-switch
      :label="`${!isInverted ? 'Показать бренды' : 'Показать продукты'}`"
      v-model="isInverted"
      @change="invert"/>
    </div>

    <v-flex v-if="isEditionAvailable" xs12>
      <div class="shop-entity-exposition__ghost mb-3">
        <card-base name="|" title="|"/>
        <div class="shop-entity-exposition__ghost-controls">
          <v-btn
          v-if="isEditionEnabled"
          class="shop-entity-exposition__ghost-button"
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
      :title="c.model.title"
      :is-edition-enabled="isEditionEnabled"
      :is-edition-available="isEditionAvailable"
      @add="add(subtype, type, c.model.id)"
      @edit="edit(type, c.model.id)"
      @remove="remove(type, c.model.id)">
        <router-link
        slot="link"
        class="link"
        :to="{ name: `${type}-id`, params: { id: c.model.id }}">
          {{c.model.name}}
        </router-link>
        <v-flex v-for="s in c.items" :key="s.id" xs12 md4 lg3>
          <shop-entity-item
          :is-loading="isLoadingItems"
          :is-edition-enabled="isEditionEnabled"
          :is-edition-available="isEditionAvailable"
          :type="subtype"
          :model="s"
          @edit="edit(subtype, s.id)"
          @remove="remove(subtype, s.id)"/>
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
import ShopEntityCollection from '~/domains/shop/ShopEntityCollection.vue';
import ShopEntityItem from '~/domains/shop/ShopEntityItem.vue';
import CardBase from '~/domains/common/CardBase.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import { EditableSmart } from './Editable';

export default {
  name: 'shop-entity-exposition',
  components: {
    ShopEntityCollection,
    ShopEntityItem,
    CardBase,
    GridLoader,
  },
  mixins: [EditableSmart],
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
          items: collectionModel.refs[this.subtype].map((id) => {
            const itemModel = this.$store.getters.entity(this.subtype, id);
            return itemModel;
          }),
        };

        return collection;
      });

      return collections;
    },
    model() { return this.data || this.collections; },
  },
  mounted() {
    setTimeout(() => this.isLoading = false, 500);
    setTimeout(() => this.isLoadingItems = false, 1000);
  },
  methods: {
    invert() { this.$emit('invert', this.isInverted); },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-exposition {
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

