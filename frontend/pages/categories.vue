<template>
  <div class="page page_categories">
    <h1>Страница с категориями</h1>
    <shop-entities-container
      :type="type"
      :items="categories">
    </shop-entities-container>
  </div>
</template>



<script>
import ShopEntitiesContainer from '~/domains/shop/ShopEntitiesContainer.vue';

import {
  ENTITY_TYPES,
  LOAD_ENTITIES,
} from '~/domains/shop/shop.state';

import { mapState } from 'vuex';


export default {
  name: 'page-categories',
  components: {
    ShopEntitiesContainer,
  },
  // fetch({ store }) {
  //   return store.dispatch(LOAD_ENTITIES(ENTITY_TYPES.category));
  // },
  data() {
    return {
      type: ENTITY_TYPES.category,
    };
  },
  computed: mapState({
    categories: state => state.shop[ENTITY_TYPES.category],
  }),
  mounted() {
    this.$store.dispatch(LOAD_ENTITIES(ENTITY_TYPES.category));
  },
};
</script>



<style>
.page_categories {
  width: 100%;
}
</style>
