<template>
<div class="page page_categories">

  <h1>Страница с категориями</h1>

  <v-content class="page__content">
    <v-container class="page__layout">
      <shop-entities-layout>
        <shop-entities-container
        type="category"
        :items="categories">
        </shop-entities-container>
      </shop-entities-layout>
    </v-container>
  </v-content>

</div>
</template>



<script>
import ShopEntitiesContainer from '@/domains/shop/ShopEntitiesContainer';
import ShopEntitiesLayout from '@/domains/shop/ShopEntitiesLayout';
import { mapState } from 'vuex';

export default {
  name: 'page-categories',
  components: {
    'shop-entities-container': ShopEntitiesContainer,
    'shop-entities-layout': ShopEntitiesLayout,
  },
  computed: mapState({
    categories: state => state.shop.categories,
  }),
};
</script>



<style lang="postcss" scoped>
.page {
}
</style>
