<template>
<div
class="shop-entity-item"
:class="{ 'shop-entity-item_loading' : !isReady }">
  <card-base
  v-if="isReady"
  :name="model.name"
  :title="model.title"
  :imgUrl="model.imgUrl"
  />

  <v-layout
  v-else
  fill-height
  row
  align-center
  justify-center>
    <v-progress-circular
    class="shop-entities-container__spinner"
    size="128"
    indeterminate
    color="red"/>
  </v-layout>

  <div class="shop-entity-item__controls"
  v-if="isEditionEnabled">
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
</div>
</template>

<script>
import CardBase from '~/domains/common/CardBase.vue';
import ShopEntity from './ShopEntity';

export default {
  name: 'shop-entity-item',
  components: {
    CardBase,
  },
  mixins: [ShopEntity],
  props: {
    type: {
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
  data() {
    return {
      isReady: false,
    };
  },
  computed: {
    model() { return this.$store.getters.entity(this.type, this.id); },
  },
  mounted() {
    setTimeout(() => this.isReady = true, 500);
  },
};
</script>

<style>
.shop-entity-item {
  position: relative;
  width: 100%;

  &__controls {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
