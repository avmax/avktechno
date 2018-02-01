<template>
  <div
    class="edition"
    :class="{ 'edition_consistent' : $slots.controls }"
  >
    <slot :add="add" :edit="edit" :remove="remove" :is-edition-available="isEditionAvailable" :is-edition-possible="isEditionPossible"/>
    <slot name="controls"/>
  </div>
</template>

<script>
import { EDITION_START_CREATION, EDITION_START_EDITION, EDITION_REMOVE } from '~/barrel/state';
import EditionBase from './base';

export default {
  name: 'edition',
  mixins: [EditionBase],
  methods: {
    add(type, refType, refId) {
      const payload = refType ? { [refType]: refId } : null;
      this.$store.commit(EDITION_START_CREATION(type), payload);
    },
    edit(type, entity) {
      this.$store.commit(EDITION_START_EDITION(type), entity);
    },
    remove(type, id) {
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
