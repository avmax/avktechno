<template>
  <div class="page page_category-view">
    <!-- <div class="page__header">
      <h1 class="text-xs-left text-md-center">{{ category.name }}</h1>
    </div> -->

    <v-layout class="page__content" column>
      <edition>
        <template scope="{ add, edit, remove, isEditionAvailable }">
          <product-collection
            :title="category.title"
            :name="category.name"
          >

          <v-container v-if="isEditionAvailable && !category.refs.product.length && +category.depth === 1" class="my-5 pa-0" fluid grid-list-xl>
            <v-layout row wrap>
              <v-flex xs12>
                <edition-ghost
                  btn-text="Добавить подкатегорию"
                  @add="add('category', { depth: 2, refs: { category: [category.id] }})"
                  fluid
                />
              </v-flex>
            </v-layout>
          </v-container>

            <edition-controls
              slot="header"
              is-edit
              is-remove
              @edit="edit('category', category)"
              @remove="remove('category', category.id)"
              style="margin-bottom: -10px;"
            />
            <v-flex xs12 sm6 lg4 v-if="isEditionAvailable && !(category.depth === 1 && category.refs.category.length !== 0)">
              <edition-ghost
                btn-text="Добавить продукт"
                @add="add('product', { refs: { category: [category.id] }})"
              />
            </v-flex>
            <v-flex
              v-for="p in category.refs.product"
              v-if="getProduct(p)"
              xs12 sm6 lg4
              :key="p.id"
            >
              <edition>
                <product-item
                  :data="getProduct(p)"
                />
                <edition-controls
                  slot="controls"
                  is-edit
                  is-remove
                  @edit="edit('product', getProduct(p))"
                  @remove="remove('product', p)"
                />
              </edition>
            </v-flex>
            <v-flex xs12 v-if="getCategories(category.refs.category).length">
              <product-collection
                class="pl-5"
                v-for="sc in getCategories(category.refs.category)"
                v-if="sc && sc.depth === 2"
                :title="sc.title"
                :name="sc.name"
                :key="sc.id"
              >
                <edition-controls
                  slot="header"
                  is-edit
                  is-remove
                  @edit="edit('category', sc)"
                  @remove="remove('category', sc.id)"
                  style="margin-bottom: -10px;"
                />
                <v-flex xs12 sm6 lg4 v-if="isEditionAvailable">
                  <edition-ghost
                    btn-text="Добавить продукт"
                    @add="add('product', { refs: { category: [sc.id] }})"
                  />
                </v-flex>
                <v-flex
                  v-for="sp in sc.refs.product"
                  v-if="getProduct(sp)"
                  xs12 sm6 lg4
                  :key="sp.id"
                >
                  <edition>
                    <product-item
                      :data="getProduct(sp)"
                    />
                    <edition-controls
                      slot="controls"
                      is-edit
                      is-remove
                      @edit="edit('product', getProduct(sp))"
                      @remove="remove('product', sp)"
                    />
                  </edition>
                </v-flex>
                <v-divider slot="footer" class="mb-4 mt-5"/>
              </product-collection>
            </v-flex>
            <v-divider slot="footer" class="mb-4 mt-5"/>
          </product-collection>
        </template>
      </edition>
    </v-layout>
  </div>
</template>

<script>
import Edition from '~/domains/edition/Edition/edition';
import EditionControls from '~/domains/edition/Edition/controls';
import EditionGhost from '~/domains/edition/Edition/ghost';
import ProductCollection from '~/domains/shop/Product/collection.vue';
import ProductItem from '~/domains/shop/Product/item.vue';

export default {
  layout: 'hard',
  components: {
    Edition,
    EditionControls,
    EditionGhost,
    ProductCollection,
    ProductItem,
  },
  computed: {
    id() { return +this.$route.params.id; },
    category() { return this.$store.getters.category(this.id); },
  },
  methods: {
    getCategories(ids) {
      const { getters } = this.$store;
      const items = ids.map(id => getters.category(id));
      return items;
    },
    getProduct(id) {
      const { getters } = this.$store;
      const item = getters.product(id);
      return item;
    },
  },
};
</script>


<style lang="scss">
#avmax {
.page_category-view {
.page {
  &__content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
}
}
}
</style>
