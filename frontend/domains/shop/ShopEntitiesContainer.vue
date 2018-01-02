<template>
<div class="avm-shop-entities-container">

  <card-exposition-base
  v-if="collections"
  :collections="collections"
  :isEditionEnabled="isEditionEnabled"
  @addCard="onAddCard"
  @editCard="onEditCard"
  @removeCard="onRemoveCard"
  @addCollection="onAddCollection"
  @editCollection="onEditCollection"
  @removeCollection="onRemoveCollection"/>
</div>
</template>


<script>
import { mapState } from 'vuex';
import CardExpositionBase from '~/domains/card/CardExpositionBase.vue';
import { LOAD_ENTITIES, ADD_ENTITY, EDIT_ENTITY, REMOVE_ENTITY } from '@/domains/shop/shop.state';

export default {
  name: 'shop-entities-container',
  components: {
    CardExpositionBase,
  },
  props: {
    type: {
      required: true,
      type: String,
      default: null,
    },
    subtype: {
      required: true,
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapState({
      collections({ shop }) {
        const collections = Object.values(shop[this.type]).map((val) => {
          const collection = { ...val, cards: Object.values(shop[this.subtype]) };
          return collection;
        });
        return collections;
      },
    }),
    isEditionEnabled() {
      return this.$store.state.user.isAdmin && !this.$store.state.shop.edition.isEnabled;
    },
  },
  beforeMount() {
    this.$store.dispatch(LOAD_ENTITIES(this.type));
    this.$store.dispatch(LOAD_ENTITIES(this.subtype));
  },
  methods: {
    onAddCard() {
      this.$store.dispatch(ADD_ENTITY(this.subtype));
    },
    onEditCard(model) {
      this.$store.dispatch(EDIT_ENTITY(this.subtype), model.id);
    },
    onRemoveCard(model) {
      this.$store.dispatch(REMOVE_ENTITY(this.subtype), model.id);
    },
    onAddCollection() {
      this.$store.dispatch(ADD_ENTITY(this.type));
    },
    onEditCollection(model) {
      this.$store.dispatch(EDIT_ENTITY(this.type), model.id);
    },
    onRemoveCollection(model) {
      this.$store.dispatch(REMOVE_ENTITY(this.type), model.id);
    },
  },
};
</script>


<style>
</style>
