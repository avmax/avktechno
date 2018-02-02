<template>
  <div class="page page_product-view">
    <edition>
      <template scope="{ add, edit, remove }">
        <edition>
          <view-product :id="id"/>
          <edition-controls
            slot="controls"
            is-edit
            is-remove
            @edit="edit('product', getProduct(id))"
            @remove="remove('product', id)"
            style="margin-top: 20px; margin-left: -10px;"
          />
        </edition>
      </template>
    </edition>
  </div>
</template>

<script>
import ViewProduct from '~/domains/shop/Product/view.vue';
import Edition from '~/domains/edition/Edition/edition';
import EditionControls from '~/domains/edition/Edition/controls';

export default {
  layout: 'normal',
  components: {
    ViewProduct,
    Edition,
    EditionControls,
  },
  computed: {
    id() { return +this.$route.params.id; },
  },
  methods: {
    getProduct(id) {
      const { getters } = this.$store;
      return getters.product(id);
    },
  },
};
</script>

<style lang="scss">
#avmax {
.page_product-view {
  max-width: 720px;
  margin: 0 auto;
}
}
</style>

