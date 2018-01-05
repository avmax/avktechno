<template>
<div class="shop-entity-item">
  <card-base
  v-if="model"
  :name="model.name"
  :title="model.title"
  :imgUrl="model.imgUrl"
  />

  <div class="shop-entity-item__controls"
  v-if="isEditionEnabled">
    <v-btn
    @click="edit()"
    fab small>
      <v-icon color="white">edit</v-icon>
    </v-btn>
    <v-btn
    @click="remove()"
    fab small>
      <v-icon color="white">clear</v-icon>
    </v-btn>
  </div>
</div>
</template>

<script>
import { ENTITY_EDIT, ENTITY_REMOVE } from '@/domains/shop/state.shop';
import { mapState } from 'vuex';
import CardBase from '~/domains/card/CardBase.vue';

export default {
  name: 'shop-entity-item',
  components: {
    CardBase,
  },
  props: {
    type: {
      type: String,
      required: true,
      default: null,
    },
    id: {
      type: [String, Number],
      required: true,
      default: null,
    },
  },
  computed: {
    model() { return this.$store.getters.entity(this.type, this.id); },
    ...mapState({
      isEditionEnabled: ({ shop, user }) => user.isAdmin && !shop.edition.isEnabled,
    }),
  },
  methods: {
    edit() { this.$store.dispatch(ENTITY_EDIT(this.type), this.model.id); },
    remove() { this.$store.dispatch(ENTITY_REMOVE(this.type), this.model.id); },
  },
};
</script>

<style>
.shop-entity-item {
  position: relative;

  &__controls {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
