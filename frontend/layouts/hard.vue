<template>
  <layout-base>

    <template slot="panels">
      <edition-panel/>
      <sidebar-secondary/>
    </template>

  </layout-base>
</template>

<script>
import LayoutBase from '~/layouts/base';
import EditionPanel from '~/domains/edition/Panel/base.vue';
import SidebarSecondary from '~/common/Sidebar/secondary';

export default {
  name: 'layout-advanced',
  components: {
    LayoutBase,
    EditionPanel,
    SidebarSecondary,
  },
};
</script>
