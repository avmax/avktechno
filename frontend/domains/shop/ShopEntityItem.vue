<template>
<div
class="shop-entity-item"
:class="{ 'shop-entity-item_loading' : !isReady }">
  <v-fade-transition>
    <card-base
    v-if="isReady"
    :name="model.name"
    :title="model.title"
    :price="model.price"
    :currency="model.currency"
    :imgUrl="model.imgUrl"
    :link="{ name: `${type}-id`, params: { id: model.id }}"
    />
  </v-fade-transition>

  <div
  v-if="!isReady"
  class="shop-entity-item__ghost">
    <card-base
    class="shop-entity-item__ghost-card"
    name="lolo"
    title="lolo"
    />
    <div class="shop-entity-item__ghost-spinner">
      <grid-loader :loading="true"/>
    </div>
  </div>

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
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import CardBase from '~/domains/common/CardBase.vue';
import ShopEntity from './ShopEntity';

export default {
  name: 'shop-entity-item',
  components: {
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
