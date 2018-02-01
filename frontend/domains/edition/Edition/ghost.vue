<template>
  <div class="edition__ghost ">
    <div class="edition__ghost-inner">
      <v-btn
        @click="add()"
        color="accent" light
      >
        {{ btnText }}
      </v-btn>
    </div>
  </div>
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
  height: 100%;

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

