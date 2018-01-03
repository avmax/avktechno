<template>
<div class="avm-shop-entities-container">

  <card-exposition-base
  v-if="isReady"
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
  data() {
    return {
      isReady: false,
    };
  },
  computed: {
    ...mapState({
      collections({ shop }) {
        let collections = [];

        collections = Object.values(shop[this.type]).map((val) => {
          const collection = { ...val };
          if (val.refs[this.subtype]) {
            collection.cards = val.refs[this.subtype]
              .map(id => shop[this.subtype][id])
              .filter(v => !!v);
          }
          return collection;
        });
        return collections;
      },
    }),
    isEditionEnabled() {
      return this.$store.state.user.isAdmin && !this.$store.state.shop.edition.isEnabled;
    },
  },
  async beforeMount() {
    await this.$store.dispatch(LOAD_ENTITIES(this.type));
    await this.$store.dispatch(LOAD_ENTITIES(this.subtype));
    this.isReady = true;
  },
  methods: {
    onAddCard(model) {
      this.$store.dispatch(ADD_ENTITY(this.subtype), { [this.type]: [model.id] });
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
