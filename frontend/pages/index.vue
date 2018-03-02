<template>
  <v-layout class="page page_products" column>
    <div class="page__header">
      <h1 class="text-xs-left text-md-center">Все продукты</h1>
    </div>

    <v-layout class="page__content" column>
      <v-layout
        v-if="!categories || !categories.length"
        justify-center align-center fill-height
      >
        <div class="title text-xs-center my-4" style="font-weight: normal;">
          <h4 class="headline mb-4">Добро пожаловать в интернет магазин компании <strong>АВК ТЕХНО!</strong></h4>
          <p>Мы очень надеемся, что на нашем сайте Вы найдете интересующий Вас товар.</p>
          <p>Для этой цели на нашем сайте предоставлена гибкая система фильтрации товаров.</p>
          <p>Пожалуйста, настройте <strong>фильтр</strong> в панели слева, и мы уверены, Вы найдете то, что ищете.</p>
        </div>
      </v-layout>
      <edition>
        <template scope="{ add, edit, remove, isEditionAvailable }">
          <v-container v-if="isEditionAvailable" class="my-5 pa-0" fluid grid-list-xl>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <edition-ghost
                  btn-text="Добавить категорию"
                  @add="add('category', { depth: 1 })"
                  fluid
                />
              </v-flex>
              <v-flex>
                <edition-ghost
                  btn-text="Добавить производителя"
                  @add="add('brand')"
                  fluid
                />
              </v-flex>
            </v-layout>
          </v-container>

          <product-collection
            v-for="c in categories"
            v-if="+c.depth === 1"
            :title="c.title"
            :name="c.name"
            :key="c.id"
          >
            <edition-controls
              slot="header"
              is-edit
              is-remove
              @edit="edit('category', c)"
              @remove="remove('category', c.id)"
              style="margin-bottom: -10px;"
            />
            <v-flex xs12 v-if="isEditionAvailable && !c.refs.product.length">
              <edition-ghost
                btn-text="Добавить подкатегорию"
                @add="add('category', { refs: { 'category': [c.id] }, depth: 2 })"
              />
            </v-flex>
            <v-flex xs12 sm4 lg3 xl2 v-if="isEditionAvailable && !c.refs.category.length">
              <edition-ghost
                btn-text="Добавить продукт"
                @add="add('product', { refs: { category: [c.id] }})"
              />
            </v-flex>
            <v-flex
              v-for="p in c.refs.product"
              v-if="getProduct(p)"
              xs12 sm4 lg3 xl2
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
            <v-flex xs12 v-if="getCategories(c.refs.category).length">
              <product-collection
                class="pl-5"
                v-for="sc in getCategories(c.refs.category)"
                v-if="sc"
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
                <v-flex xs12 sm4 lg3 xl2 v-if="isEditionAvailable">
                  <edition-ghost
                    btn-text="Добавить продукт"
                    @add="add('product', { refs: { category: [sc.id] }})"
                  />
                </v-flex>
                <v-flex
                  v-for="sp in sc.refs.product"
                  v-if="getProduct(sp)"
                  xs12 sm4 lg3 xl2
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
  </v-layout>
</template>


<script>
import Edition from '~/domains/edition/Edition/edition';
import EditionControls from '~/domains/edition/Edition/controls';
import EditionGhost from '~/domains/edition/Edition/ghost';
import ProductCollection from '~/domains/shop/Product/collection.vue';
import ProductItem from '~/domains/shop/Product/item.vue';

export default {
  name: 'page-products',
  layout: 'hard',
  components: {
    Edition,
    EditionControls,
    EditionGhost,
    ProductCollection,
    ProductItem,
  },
  computed: {
    categories() {
      const { getters } = this.$store;
      const items = getters.categories;
      return items;
    },
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
.page_products {
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
