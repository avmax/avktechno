<template>
<div class="shop-entity-collection py-3">

  <v-layout class="mb-3 shop-entity-collection__header" align-center justify-start wrap>
    <router-link class="link display-1" :to="link">{{name}}</router-link>
    <slot name="header"/>
    <!-- <h3 class="shop-entity-collection__header-title heading" v-if="title">{{title}}</h3> -->
  </v-layout>

  <v-container fluid class="pa-0" grid-list-xl>
    <v-layout row justify-start wrap>
      <slot/>
      <v-flex v-if="!$slots.default && !isEditionAvailable" xs12>
        <h2 class="subheading text-xs-left py-5"> Увы, коллекция пуста</h2>
      </v-flex>
    </v-layout>
  </v-container>

</div>
</template>


<script>
export default {
  name: 'shop-entity-collection',
  props: {
    name: String,
    title: String,
    link: Object,
  },
};
</script>


<style lang="scss" scoped>
#avmax {
.shop-entity-collection {
  &__header {
    &-name {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &-title {
      width: 60%;
    }
  }
}
}
</style>
