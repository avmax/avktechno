<template>
<div class="shop-entities-container">

  <card-collection-base
  @addCard="onAddCard"
  @editCard="onEditCard"
  @removeCard="onRemoveCard"
  :cards="items"
  :isEditionEnabled="isEditionEnabled"/>
</div>
</template>


<script>
  import CardCollectionBase from '~/domains/card/CardCollectionBase.vue';
  import { ADD_ENTITY, EDIT_ENTITY, REMOVE_ENTITY } from '@/domains/shop/shop.state';

  export default {
    name: 'shop-entities-container',
    components: {
      CardCollectionBase,
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
        this.$store.dispatch(`shop/${ADD_ENTITY}`, this.type);
      },
      onEditCard(card) {
        this.$store.dispatch(`shop/${EDIT_ENTITY}`, { entityType: this.type, entityData: card });
      },
      onRemoveCard(id) {
        this.$store.dispatch(`shop/${REMOVE_ENTITY}`, { entityType: this.type, entityId: id })
          .catch(err => console.log(err));
      },
    },
  };
</script>


<style>
#avmax {
}
</style>
