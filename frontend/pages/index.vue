<template>
  <v-layout class="page" column>
    <div class="page__header">
      <h1 class="text-xs-left text-md-center">Все продукты</h1>
    </div>
    <entity-exposition
      :type="type"
      :subtype="subtype"
    />
  </v-layout>
</template>


<script>
import EntityExposition from '~/domains/shop/EntityExposition/base.vue';
import { ENTITY_TYPES } from '~/domains/barrel.types';

export default {
  name: 'page-categories-brands',
  layout: 'hard',
  components: { EntityExposition },
  data() {
    return {
      type: ENTITY_TYPES.category,
      subtype: ENTITY_TYPES.product,
    };
  },
};
</script>
