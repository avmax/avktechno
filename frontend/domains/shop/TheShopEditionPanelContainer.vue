<template>
  <div>
    <h1>HOLA</h1>
    <the-shop-edition-panel-category
    v-if="isTypeCategory"
    :value="value"
    @change="onPanelChange"
    @apply="apply"
    @abort="abort"
    />
    <the-shop-edition-panel-brand
    v-if="isTypeBrand"
    :value="value"
    @change="onPanelChange"
    @apply="apply"
    @abort="abort"
    />
    <h4 v-if="message">{{message}}</h4>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TheShopEditionPanelCategory from '~/domains/shop/TheShopEditionPanelCategory.vue';
import TheShopEditionPanelBrand from '~/domains/shop/TheShopEditionPanelBrand.vue';
import { ENTITY_TYPES, EDIT_ENTITY, SAVE_EDITION, STOP_EDITION } from '~/domains/shop/shop.state';

export default {
  name: 'the-shop-edition-panel-container',
  components: {
    TheShopEditionPanelCategory,
    TheShopEditionPanelBrand,
  },
  data() {
    return {
      message: null,
    };
  },
  computed: {
    ...mapState({
      type({ shop }) { return shop.edition.entityType; },
      value({ shop }) { return shop.edition.value; },
    }),
    isTypeCategory() { return this.type === ENTITY_TYPES.category; },
    isTypeBrand() { return this.type === ENTITY_TYPES.brand; },
  },
  methods: {
    onPanelChange(v) {
      this.$store.commit(EDIT_ENTITY(this.type), v);
    },
    async apply(value) {
      try {
        await this.$store.dispatch(SAVE_EDITION(this.type), value);
        this.$store.commit(STOP_EDITION);
      } catch (err) {
        this.message = 'failure';
      }
    },
    abort() {
      this.$store.commit(STOP_EDITION);
    },
  },
};
</script>
