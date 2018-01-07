<template>
  <v-layout class="shop-entity-exposition" column>
    <template v-if="isReady">
      <v-flex
      v-if="isEditionAvailable" xs12>
        <div class="shop-entity-exposition__ghost mb-3">
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
      <v-flex v-for="id in model" :key="id" xs12 class="mb-4">
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
        <grid-loader :loading="true"/>
      </v-layout>
    </template>
  </v-layout>
</template>

<script>
import {
  EDITION_ADD,
} from '~/domains/barrel.state';
import CardBase from '~/domains/common/CardBase.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import ShopEntity from './ShopEntity';
import ShopEntityCollection from './ShopEntityCollection.vue';

export default {
  name: 'shop-entity-exposition',
  components: {
    ShopEntityCollection,
    CardBase,
    GridLoader,
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
  computed: {
    model() {
      return this.data
        ? this.data
        : this.$store.getters.entities(this.type);
    },
  },
  methods: {
    add() { this.$store.dispatch(EDITION_ADD(this.type)); },
  },
  mounted() {
    if (this.isEmpty) {
      setTimeout(() => this.isReady = true, 500);
    } else {
      this.isReady = true;
    }
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

