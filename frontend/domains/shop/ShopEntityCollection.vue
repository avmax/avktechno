<template>
<div class="shop-entity-collection py-3">
  <div class="mb-3">
    <h2
    class="shop-entity-collection__header-name display-1 mb-2"
    v-if="model.name || isEditionEnabled">
      {{model.name}}
        <div
        class="ml-2"
        v-if="isEditionEnabled"
        slot="controls">
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
        </div>
    </h2>
    <h3 class="shop-entity-collection__header-title heading" v-if="model.title">{{model.title}}</h3>
  </div>
  <v-layout
  row justify-start wrap>
    <v-flex
    v-if="isEditionAvailable"
    xs12 md5 lg3 mb-5 mr-5>
      <div class="shop-entity-collection__ghost">
        <card-base
        name="lololo"
        title="lololo"/>
        <div class="shop-entity-collection__ghost-controls">
          <v-btn
          v-if="isEditionEnabled"
          class="shop-entity-collection__ghost-button"
          @click="add"
          fab large>
            <v-icon>add</v-icon>
          </v-btn>
        </div>
      </div>
    </v-flex>
    <v-flex v-for="id in items" :key="id" xs12 md5 lg3 mb-5 mr-5>
      <shop-entity-item
      :type="subtype"
      :id="id"/>
    </v-flex>
    <v-flex v-if="(!items || !items.length) && !isEditionAvailable" xs12>
      <h2 class="subheading text-xs-left py-5"> Увы, коллекция пуста</h2>
    </v-flex>
  </v-layout>
</div>
</template>


<script>
import { ENTITY_ADD, ENTITY_EDIT, ENTITY_REMOVE } from '@/domains/shop/state.shop';
import CardBase from '~/domains/card/CardBase.vue';
import { mapState } from 'vuex';
import ShopEntityItem from './ShopEntityItem.vue';

export default {
  name: 'shop-entity-collection',
  components: {
    ShopEntityItem,
    CardBase,
  },
  props: {
    type: {
      type: String,
      required: true,
      default: null,
    },
    subtype: {
      type: String,
      required: true,
      default: null,
    },
    id: {
      type: [String, Number],
      required: true,
      default: null,
    },
  },
  computed: {
    ...mapState({
      isEditionEnabled: ({ shop, user }) => user.isAdmin && !shop.edition.isEnabled,
      isEditionAvailable: ({ user }) => user.isAdmin,
    }),
    model() { return this.$store.getters.entity(this.type, this.id); },
    items() { return this.model.refs[this.subtype]; },
  },
  methods: {
    add() { this.$store.dispatch(ENTITY_ADD(this.subtype), { [this.type]: this.model.id }); },
    edit() { this.$store.dispatch(ENTITY_EDIT(this.type), this.model.id); },
    remove() { this.$store.dispatch(ENTITY_REMOVE(this.type), this.model.id); },
  },
};
</script>


<style lang="scss">
#avmax {
.shop-entity-collection {
  &__header {
    &-name {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &-title {
      width: 60%;
    }
  }

  &__ghost {
    position: relative;

    &-controls {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
    }
  }
}
}
</style>
