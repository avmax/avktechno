<template>
  <v-navigation-drawer
    :value="isEditionPanelOpened"
    disable-resize-watcher
    disable-route-watcher
    mobile-break-point="1080"
    width="400"
    class="pa-3"
    app
    clipped
    fixed
    right
  >
    <component :is="editionPanel"/>
  </v-navigation-drawer>
</template>

<script>
import { ENTITY_TYPES } from '~/barrel/types';
import EditionPanelCategory from '~/domains/edition/Panel/category.vue';
import EditionPanelBrand from '~/domains/edition/Panel/brand.vue';
import EditionPanelProduct from '~/domains/edition/Panel/product.vue';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isEditionPanelOpened: ({ edition }) => edition.isActive,
      editionPanel({ edition }) {
        let component;
        switch (edition.entityType) {
          case (ENTITY_TYPES.brand):
            component = EditionPanelBrand;
            break;
          case (ENTITY_TYPES.category):
            component = EditionPanelCategory;
            break;
          case (ENTITY_TYPES.product):
            component = EditionPanelProduct;
            break;
          default:
            component = null;
        }

        return component;
      },
    }),
  },
};
</script>

