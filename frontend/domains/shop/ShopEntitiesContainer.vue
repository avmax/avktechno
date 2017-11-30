<template>
<div class="shop-entities-container">

  <card-collection-base
  @addCard="onAddCard"
  @removeCard="onRemoveCard"
  :cards="items"
  :isEditionEnabled="isEditionEnabled"/>

</div>
</template>



<script>
  import CardCollectionBase from '~/domains/card/CardCollectionBase.vue';
  import { removeCategory } from '~/domains/shop/shop.api';
  import { CREATE_CATEGORY, REMOVE_CATEGORY } from '@/domains/shop/shop.state';

  export default {
    name: 'shop-entities-container',
    components: {
      'card-collection-base': CardCollectionBase,
    },
    computed: {
      isEditionEnabled() { return this.$store.state.user.isAdmin; },
    },
    props: {
      items: Array,
      type: String,
    },
    methods: {
      onAddCard() {
        switch (this.type) {
          case 'category':
            this.$store.commit(`shop/${CREATE_CATEGORY}`);
            break;
          default:
            break;
        }
      },
      onRemoveCard(cardId) {
        switch (this.type) {
          case 'category':
            removeCategory(cardId)
              .then(() => this.$store.commit(`shop/${REMOVE_CATEGORY}`, cardId))
              .catch(err => console.error(err.response.data));
            break;
          default:
            break;
        }
      },
    },
  };
</script>



<style>
#avmax {
}
</style>
