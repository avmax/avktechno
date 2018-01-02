<template>
<div class="avm-card-collection py-3">
  <div class="mb-3">
    <h2 class="display-3 avm-card-collection__header-title" v-if="name">{{name}} <slot name="controls"/></h2>
    <h3 class="display-2" v-if="title">{{title}}</h3>
  </div>
  <v-layout
  v-if="cards || isEditionEnabled"
  row justify-start wrap>
    <v-flex
    class="avm-card-collection__card-holder"
    v-for="card in cards"
    :key="card.id"
    xs12 md5 lg3 mb-5 mr-5>
      <card-base
      :name="card.name"
      :title="card.title"
      :imgUrl="card.imgUrl"
      />
      <div class="avm-card-collection__card-controls"
      v-if="isEditionEnabled">
        <v-btn
        @click="editCard(card)"
        fab small>
          <v-icon color="white">edit</v-icon>
        </v-btn>
        <v-btn
        @click="removeCard(card)"
        fab small>
          <v-icon color="white">clear</v-icon>
        </v-btn>
      </div>
    </v-flex>
    <v-flex
    v-if="isEditionEnabled"
    xs12 md5 lg3 mb-5 mr-5>
      <div class="avm-card-collection__ghost">
        <card-base
        title="lololo"
        description="lololo"/>
        <div class="avm-card-collection__ghost-controls">
          <v-btn class="avm-card-collection__ghost-button"
          @click="addCard"
          fab large>
            <v-icon>add</v-icon>
          </v-btn>
        </div>
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
import CardBase from '~/domains/card/CardBase.vue';

export default {
  name: 'card-collection-base',
  components: {
    'card-base': CardBase,
  },
  props: {
    name: String,
    title: String,
    cards: Array,
    isEditionEnabled: Boolean,
  },
  methods: {
    addCard() {
      this.$emit('addCard');
    },
    editCard(model) {
      this.$emit('editCard', model);
    },
    removeCard(model) {
      this.$emit('removeCard', model);
    },
  },
};
</script>


<style lang="scss">
#avmax {
.avm-card-collection {
  &__header {
    &-title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }

  &__card-controls {
    position: absolute;
    top: -25px;
    right: 0;
  }

  &__card-holder {
    position: relative;
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

    &-button {
      color: yellowgreen;
      background-color: black;
    }
  }
}
}
</style>
