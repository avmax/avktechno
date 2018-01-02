<template>
  <div class="avm-card-exposition">
    <v-layout column v-if="collections">
      <v-flex
      class="avm-card-exposition__collection-holder"
      v-for="collection in collections"
      :key="collection.id"
      xs12>
        <card-collection-base
        :name="collection.name"
        :title="collection.title"
        :cards="collection.cards"
        :is-edition-enabled="isEditionEnabled"
        @addCard="addCard"
        @editCard="editCard"
        @removeCard="removeCard">
          <div
          class="avm-card-exposition__collection-controls ml-2"
          v-if="isEditionEnabled"
          slot="controls">
            <v-btn class="avm-card-exposition__collection-control"
            @click="editCollection(collection)"
            fab small>
              <v-icon color="white">edit</v-icon>
            </v-btn>
            <v-btn class="avm-card-exposition__collection-control"
            @click="removeCollection(collection)"
            fab small>
              <v-icon color="white">clear</v-icon>
            </v-btn>
          </div>
        </card-collection-base>
        <v-divider/>
      </v-flex>
      <v-flex
      class="avm-card-exposition__ghost"
      v-if="isEditionEnabled" xs12>
        <card-collection-base :is-edition-enabled="isEditionEnabled"/>
        <div class="avm-card-exposition__ghost-controls">
          <v-btn class="avm-card-exposition__ghost-button"
          @click="addCollection"
          fab large>
            <v-icon class="avm-card-exposition__ghost-icon">add</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CardCollectionBase from './CardCollectionBase.vue';

export default {
  name: 'card-exposition-base',
  components: {
    CardCollectionBase,
  },
  props: {
    collections: Array,
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
    addCollection() {
      this.$emit('addCollection');
    },
    editCollection(model) {
      this.$emit('editCollection', model);
    },
    removeCollection(model) {
      this.$emit('removeCollection', model);
    },
  },
};
</script>

<style>
.avm-card-exposition {
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

