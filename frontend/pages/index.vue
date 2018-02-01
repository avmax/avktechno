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
                  @add="add('category')"
                  fluid
                />
              </v-flex>
              <v-flex>
                <edition-ghost
                  btn-text="Добавить бренд"
                  @add="add('brand')"
                  fluid
                />
              </v-flex>
            </v-layout>
          </v-container>

          <template v-for="c in categories">
            <product-collection
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
              <v-flex xs12 v-if="isEditionAvailable">
                <edition-ghost
                  btn-text="Добавить подкатегорию"
                  @add="add('category', 'category', c.id)"
                />
              </v-flex>
              <v-flex xs12 sm6 lg4 v-if="isEditionAvailable">
                <edition-ghost
                  btn-text="Добавить продукт"
                  @add="add('product', 'category', c.id)"
                />
              </v-flex>
              <v-flex
                v-for="p in c.refs.product"
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
            </product-collection>
            <v-divider :key="c.id" class="mb-4 mt-5"/>
          </template>
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
  name: 'page-categories-brands',
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
      const { state, getters } = this.$store;
      const { filter } = state;
      const categories = getters.categories;
      const chosen = filter.chosen.category;

      const items = categories.filter(e => chosen.indexOf(e.id) !== -1);
      return items;
    },
  },
  methods: {
    getProduct(id) {
      const { state, getters } = this.$store;
      const { filter } = state;
      const product = getters.product(id);
      const chosen = filter.chosen.product;
      const chosenBrands = filter.chosen.brand;

      let item;
      const flag =
        chosen.indexOf(id) !== -1
        && (chosenBrands.indexOf(product.refs.brand[0]) !== -1 || !product.refs.brand[0]);

      if (flag) {
        item = product;
      } else {
        item = null;
      }

      return item;
    },
  },
};
</script>

<style lang="scss" scoped>
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
