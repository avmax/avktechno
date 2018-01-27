<template>
  <layout-base>
    <edition-panel slot="panels"/>
  </layout-base>
</template>

<script>
import LayoutBase from '~/layouts/base';
import EditionPanel from '~/domains/edition/Panel/base.vue';

export default {
  name: 'layout-advanced',
  components: {
    LayoutBase,
    EditionPanel,
  },
};
</script>
