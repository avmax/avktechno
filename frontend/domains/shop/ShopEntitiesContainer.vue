<template>
<div class="shop-entities-container">

  <card-collection-base
  @addCard="onAddCard"
  @editCard="onEditCard"
  @removeCard="onRemoveCard"
  :cards="cards"
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
      isEditionEnabled() {
        return this.$store.state.user.isAdmin && !this.$store.state.shop.edition.isEnabled;
      },
      cards() {
        return Object.keys(this.items).map(key => this.items[key]);
      },
    },
    props: {
      items: Object,
      type: String,
    },
    methods: {
      onAddCard() {
        this.$store.dispatch(ADD_ENTITY(this.type));
      },
      onEditCard(model) {
        this.$store.dispatch(EDIT_ENTITY(this.type), model.id);
      },
      onRemoveCard(model) {
        this.$store.dispatch(REMOVE_ENTITY(this.type), model.id);
      },
    },
  };
</script>


<style>
#avmax {
}
</style>
