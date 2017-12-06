<template>
  <div class="page page_categories">
    <h1>Страница с категориями</h1>
    <shop-entities-container
      type="category"
      :items="categories">
    </shop-entities-container>
  </div>
</template>



<script>
import ShopEntitiesContainer from '~/domains/shop/ShopEntitiesContainer.vue';

import { GET_ENTITIES } from '~/domains/shop/shop.state';

import { mapState } from 'vuex';


export default {
  name: 'page-categories',
  components: {
    ShopEntitiesContainer,
  },
  fetch({ store }) {
    return store.dispatch(`shop/${GET_ENTITIES}`, { entityType: 'category' });
  },
  computed: mapState({
    categories: state => state.shop.categories,
  }),
};
</script>



<style>
.page_categories {
  width: 100%;
}
</style>
