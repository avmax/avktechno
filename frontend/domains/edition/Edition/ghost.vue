<template>
  <v-flex v-if="isEditionAvailable" class="edition__ghost " xs12 sm6 :lg4="!fluid">
    <div class="edition__ghost-inner">
      <v-btn
        @click="add()"
        color="accent" light
      >
        {{ btnText }}
      </v-btn>
    </div>
  </v-flex>
</template>

<script>
import EditionBase from './base';

export default {
  name: 'edition-ghost',
  mixins: [EditionBase],
  props: {
    fluid: Boolean,
    btnText: String,
  },
  methods: {
    add() { this.$emit('add'); },
  },
};
</script>

<style scoped lang="scss">
#avmax {
.edition__ghost {
  min-height: 200px;

  &-inner {
    height: 100%;
    width: 100%;
    min-height: 200px;
    background: #003559;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
}
</style>

