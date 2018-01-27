<template>
  <div v-if="isEditionAvailable" class="edition__controls">
    <v-btn
      v-if="isAdd"
      @click="add()"
      fab small color="accent" light
    >
      <v-icon >add</v-icon>
    </v-btn>

    <v-btn
      v-if="isEdit"
      @click="edit()"
      fab small color="accent" light
    >
      <v-icon >edit</v-icon>
    </v-btn>

    <v-btn
      v-if="isRemove"
      @click="remove()"
      fab small color="accent" light
    >
      <v-icon >clear</v-icon>
    </v-btn>
  </div>
</template>

<script>
import EditionBase from './base';

export default {
  name: 'edition-controls',
  mixins: [EditionBase],
  props: {
    isAdd: Boolean,
    isEdit: Boolean,
    isRemove: Boolean,
  },
  methods: {
    add() { this.$emit('add'); },
    edit() { this.$emit('edit'); },
    remove() { this.$emit('remove'); },
  },
};
</script>

<style scoped lang="scss">
#avmax {
.edition {
  &_consistent {
    .edition__controls {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
}
</style>
