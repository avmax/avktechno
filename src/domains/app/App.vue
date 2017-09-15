<template>
<v-app id="avmax">
  <router-view/>
</v-app>
</template>



<script>
import { getCategories } from '@/domains/shop/shop.api';
import { ADD_CATEGORY } from '@/domains/shop/shop.state';

export default {
  name: 'avktechno',
  created() {
    getCategories()
      .then(({ data }) => data.forEach(category => this.$store.commit(ADD_CATEGORY, category)))
      .catch(err => console.error(err.response.data));
  },
};
</script>



<style lang="postcss">
@import url(../../../node_modules/vuetify/dist/vuetify.css);

html {
  overflow-y: visible !important;
}

.page {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 22px;
  line-height: 1.5;

  &__spinner {
  }
}
</style>
