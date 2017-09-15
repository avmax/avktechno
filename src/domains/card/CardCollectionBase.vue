<template>
<div class="avm-card-collection">

  <v-layout
  class="avm-card-collection__layout"
  v-if="cards"
  row justify-start wrap>
    <v-flex
    class="avm-card-collection__card-holder"
    v-for="card in cards"
    :key="card.id"
    xs12 md5 lg3 mb-5 mr-5>
      <card-base
      class="avm-card-collection__card"
      :title="card.title"
      :text="card.text"
      :imgUrl="card.imgUrl">
      </card-base>
      <div class="avm-card-collection__card-controls"
      v-if="isEditionEnabled">
        <v-btn class="avm-card-collection__card-control"
        @click="editCard"
        fab small>
          <v-icon class="avm-card-collection__card-control-icon">edit</v-icon>
        </v-btn>
        <v-btn class="avm-card-collection__card-control"
        @click="removeCard(card.id)"
        fab small>
          <v-icon class="avm-card-collection__card-control-icon">clear</v-icon>
        </v-btn>
      </div>
    </v-flex>
    <v-flex
    v-if="isEditionEnabled"
    xs12 md5 lg3 mb-5 mr-5>
      <div class="avm-carCollection__card avm-card-collection__ghost">
        <v-btn class="avm-card-collection__ghost-button"
         @click="addCard"
         fab large>
          <v-icon class="avm-card-collection__ghost-icon">add</v-icon>
        </v-btn>
      </div>
    </v-flex>
  </v-layout>

  <v-progress-circular
  v-else
  class="avm-card-collection__spinner"
  indeterminate
  color="green"/>

</div>
</template>



<script>
import CardBase from '@/domains/card/CardBase';

export default {
  name: 'card-collection-base',
  components: {
    'card-base': CardBase,
  },
  props: {
    cards: Array,
    isEditionEnabled: Boolean,
  },
  methods: {
    addCard() {
      this.$emit('addCard');
    },
    editCard() {
      this.$emit('editCard');
    },
    removeCard(id) {
      this.$emit('removeCard', id);
    },
  },
};
</script>



<style lang="postcss" scoped>
#avmax {
.avm-card-collection {
  &__card-holder {
    position: relative;
  }

  &__card-controls {
    position: absolute;
    top: -25px;
    right: 0;
  }

  &__card-control-icon {
    color: black;
  }

  &__ghost {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);

    &-button {
      color: yellow;
      background-color: black;
    }
  }
}
}
</style>
