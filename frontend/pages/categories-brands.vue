<template>
  <div class="page page_categories-brands">
    <h1>CATEGORIES - BRANDS</h1>
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
  name: 'page-categories-brands',
  components: {
    ShopEntitiesContainer,
  },
  data() {
    return {
      type: ENTITY_TYPES.category,
      subtype: ENTITY_TYPES.brand,
    };
  },
};
</script>



<style>
.page_categories-brands {
  width: 100%;
}
</style>
