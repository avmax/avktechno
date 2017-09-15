<!--suppress ALL -->
<template>
<div class="shop-entities-layout">

  <slot/>

  <v-navigation-drawer
  v-if="isEditionEnabled"
  v-model="isEditionPanelOpened"
  absolute value="">
    <shop-entities-edition-panel v-if="isEditionPanelOpened"/>
  </v-navigation-drawer>

</div>
</template>



<script>
import { CANCEL_EDITION } from '@/domains/shop/shop.state';
import ShopEntitiesEditionPanel from '@/domains/shop/ShopEntitiesEditionPanel';

export default {
  name: 'shop-entities-layout',
  components: {
    'shop-entities-edition-panel': ShopEntitiesEditionPanel,
  },
  computed: {
    isEditionEnabled() { return this.$store.state.user.isAdmin; },
    isEditionPanelOpened: {
      get() {
        return !!this.$store.state.shop.entityBeingEdited;
      },
      set(val) {
        if (!val) {
          this.$store.commit(CANCEL_EDITION);
        }
      },
    },
  },
};
</script>



<style lang="postcss" scoped>
#avmax {

}
</style>
