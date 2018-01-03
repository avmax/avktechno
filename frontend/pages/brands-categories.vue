<template>
  <div class="page page_brands-categories">
    <h1>BRANDS - CATEGORIES</h1>
    <shop-entities-container
      :type="type"
      :subtype="subtype">
    </shop-entities-container>
  </div>
</template>



<script>
import ShopEntitiesContainer from '~/domains/shop/ShopEntitiesContainer.vue';

import { ENTITY_TYPES } from '~/domains/shop/shop.state';

export default {
  name: 'page-brands-categories',
  components: {
    ShopEntitiesContainer,
  },
  data() {
    return {
      type: ENTITY_TYPES.brand,
      subtype: ENTITY_TYPES.category,
    };
  },
};
</script>



<style>
.page_brands-categories {
  width: 100%;
}
</style>
