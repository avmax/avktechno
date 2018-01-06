<template>
  <v-layout class="shop-entity-exposition" column>
    <template v-if="isReady">
      <v-flex
      v-if="isEditionAvailable" xs12>
        <div class="shop-entity-exposition__ghost my-3">
          <card-base
          name="lololo"
          title="lololo"/>
          <div class="shop-entity-exposition__ghost-controls">
            <v-btn
            class="shop-entity-exposition__ghost-button"
            v-if="isEditionEnabled"
            @click="add"
            fab large>
              <v-icon>add</v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>
      <v-flex v-for="id in model" :key="id" xs12 class="my-3">
        <shop-entity-collection :id="id" :type="type" :subtype="subtype"/>
        <v-divider/>
      </v-flex>
    </template>
    <template v-else>
      <v-layout
      fill-height
      row
      align-center
      justify-center>
        <v-progress-circular
        class="shop-entities-container__spinner"
        size="200"
        indeterminate
        color="red"/>
      </v-layout>
    </template>
  </v-layout>
</template>

<script>
import {
  EDITION_ADD,
} from '~/domains/barrel.state';
import CardBase from '~/domains/common/CardBase.vue';
import ShopEntity from './ShopEntity';
import ShopEntityCollection from './ShopEntityCollection.vue';

export default {
  name: 'shop-entity-exposition',
  components: {
    ShopEntityCollection,
    CardBase,
  },
  mixins: [ShopEntity],
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
    data: Array,
  },
  data() {
    return {
      isReady: false,
    };
  },
  computed: {
    model() {
      return this.data
        ? this.data
        : this.$store.getters.entities(this.type);
    },
  },
  beforeMount() {
    setTimeout(() => this.isReady = true, 500);
  },
  methods: {
    add() { this.$store.dispatch(EDITION_ADD(this.type)); },
  },
};
</script>

<style>
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

