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
import ShopEntitiesContainer from '~/domains/shop/ShopEntitiesContainer.vue';
import ShopEntitiesLayout from '~/domains/shop/ShopEntitiesLayout.vue';

import { LOAD_CATEGORIES } from '~/domains/shop/shop.state';

import { mapState } from 'vuex';


export default {
  name: 'page-categories',
  components: {
    'shop-entities-container': ShopEntitiesContainer,
    'shop-entities-layout': ShopEntitiesLayout,
  },
  fetch({ store }) {
    return store.dispatch(`shop/${LOAD_CATEGORIES}`);
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  computed: mapState({
    categories: state => state.shop.categories,
  }),
};
</script>



<style>
.page {
}
</style>
