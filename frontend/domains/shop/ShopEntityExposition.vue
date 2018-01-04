<template>
  <v-layout class="avm-shop-entity-exposition" column>
    <template v-if="isReady">
      <v-flex
      v-if="isEditionEnabled" xs12>
        <div class="avm-shop-entity-exposition__ghost">
          <card-base
          name="lololo"
          title="lololo"/>
          <div class="avm-shop-entity-exposition__ghost-controls">
            <v-btn @click="add" fab large>
              <v-icon>add</v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>
      <v-flex v-for="id in model" :key="id" xs12>
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
        class="avm-shop-entities-container__spinner"
        size="128 "
        indeterminate
        color="red"/>
      </v-layout>
    </template>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import CardBase from '~/domains/card/CardBase.vue';
import { ENTITY_LOAD, ENTITY_ADD } from '@/domains/shop/state.shop';
import ShopEntityCollection from './ShopEntityCollection.vue';

export default {
  name: 'shop-entity-exposition',
  components: {
    ShopEntityCollection,
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
  },
  data() {
    return {
      isReady: false,
    };
  },
  computed: {
    ...mapState({
      isEditionEnabled: ({ shop, user }) => user.isAdmin && !shop.edition.isEnabled,
    }),
    model() { return this.$store.getters.entities(this.type); },
  },
  async beforeMount() {
    await this.$store.dispatch(ENTITY_LOAD());
    this.isReady = true;
  },
  methods: {
    add() { this.$store.dispatch(ENTITY_ADD(this.type)); },
  },
};
</script>

<style>
.avm-shop-entity-exposition {
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
</style>

