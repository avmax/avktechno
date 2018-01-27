<template>
  <div
  class="edition"
  :class="{ 'edition_consistent' : $slots.controls }">
    <slot :add="add" :edit="edit" :remove="remove"/>
    <slot name="controls"/>
  </div>
</template>

<script>
import { EDITION_ADD, EDITION_EDIT, EDITION_REMOVE } from '~/domains/barrel.state';
import EditionBase from './base';

export default {
  name: 'edition',
  mixins: [EditionBase],
  methods: {
    add(type, refType, refId) {
      console.log('add', type, refType, refId);
      const payload = refType ? { [refType]: refId } : {};
      this.$store.dispatch(EDITION_ADD(type), payload);
    },
    edit(type, id) {
      console.log('edit', type, id);
      this.$store.dispatch(EDITION_EDIT(type), id);
    },
    remove(type, id) {
      console.log('remove', type, id);
      this.$store.dispatch(EDITION_REMOVE(type), id);
    },
  },
};
</script>

<style scoped lang="scss">
#avmax {
.edition {
  position: relative;
}
}
</style>
