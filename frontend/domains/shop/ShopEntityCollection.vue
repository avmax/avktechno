<template>
<div class="shop-entity-collection py-3">
  <div class="mb-3 shop-entity-collection__header">
    <h2 class="shop-entity-collection__header-name display-1 mb-2">
        <slot name="link"/>

        <div class="ml-2" v-if="isEditionEnabled">
          <v-btn @click="edit()" fab small>
            <v-icon color="white">edit</v-icon>
          </v-btn>
          <v-btn @click="remove()" fab small>
            <v-icon color="white">clear</v-icon>
          </v-btn>
        </div>
    </h2>

    <h3 class="shop-entity-collection__header-title heading" v-if="title">{{title}}</h3>
  </div>

  <v-container fluid class="pa-0" grid-list-xl>
    <v-layout row justify-start wrap>
      <v-flex v-if="isEditionAvailable" xs12 md4 lg3>
        <div class="shop-entity-collection__ghost">
          <card-base name="lololo" title="lololo"/>
          <div class="shop-entity-collection__ghost-controls">
            <v-btn
            v-if="isEditionEnabled"
            class="shop-entity-collection__ghost-button"
            @click="add" fab large>
              <v-icon>add</v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>

      <slot/>

      <v-flex v-if="!$slots.default && !isEditionAvailable" xs12>
        <h2 class="subheading text-xs-left py-5"> Увы, коллекция пуста</h2>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>


<script>
import CardBase from '~/domains/common/CardBase.vue';
import { EditableDumb } from './Editable';

export default {
  name: 'shop-entity-collection',
  components: { CardBase },
  mixins: [EditableDumb],
  props: {
    title: String,
    isEditionEnabled: Boolean,
    isEditionAvailable: Boolean,
  },
};
</script>


<style lang="scss" scoped>
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
