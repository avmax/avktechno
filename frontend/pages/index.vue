<template>
<div class="page page_about">
  <v-container class="page__inner px-0 py-4">
    <v-layout class="page__header" justify-space-between>
      <h2 class="mb-3">О компании</h2>
      <v-avatar size="96px" class="page__logo hidden-sm-and-down ml-1"><img src="/oteks.logo.jpg" alt="Otex logo"></v-avatar>
    </v-layout>
    <v-layout column class="page__content">
      <section>
        <p>
          Компания <strong>БЕНТО КЛУБ</strong> - официальный дилер компании <strong><a class="secondary--text" href="http://otex.su/">Отэкс</a></strong> <v-avatar class="ml-1 hidden-md-and-up"><img src="/oteks.logo.jpg" alt="Otex logo"></v-avatar> 	<br>
          Наша компания - официальный дилер компании Отэкс, крупнейшего производителя бентонитов и полимеров БЕНТЕКС в России.
        </p>
      </section>

      <v-divider class="my-4"/>

      <!-- <section class="partners">
        <h2 class="mb-3">Наши партнеры</h2>
        <edition>
          <template scope="{ add, edit, remove, isEditionAvailable }">
            <v-container fluid class="pa-0" grid-list-xl>
              <v-layout row wrap justify-start>
                <v-flex v-if="isEditionAvailable" xs12 sm4 lg3 xl2>
                  <edition-ghost
                    btn-text="Добавить производителя"
                    @add="add('brand')"
                    fluid
                  />
                </v-flex>
                <v-flex
                  xs12 sm4 lg3 xl2
                  v-for="b in brands"
                  :key="b.id"
                >
                  <edition>
                    <brand-item :data="b"/>
                    <edition-controls
                      slot="controls"
                      is-edit
                      is-remove
                      @edit="edit('brand', b)"
                      @remove="remove('brand', b.id)"
                    />
                  </edition>
                </v-flex>
              </v-layout>
            </v-container>
          </template>
        </edition>
      </section> -->
    </v-layout>
  </v-container>
</div>
</template>

<script>
import BrandItem from '~/domains/shop/Brand/item.vue';
import Edition from '~/domains/edition/Edition/edition';
import EditionControls from '~/domains/edition/Edition/controls';
import EditionGhost from '~/domains/edition/Edition/ghost';

export default {
  layout: 'normal',
  components: {
    BrandItem,
    Edition,
    EditionControls,
    EditionGhost,
  },
  computed: {
    brands() {
      const items = this.$store.getters.brands;
      return items;
    },
  },
};
</script>

<style lang="scss">
#avmax {
.page_about {
  p {
    text-align: left;
  }

  .page {
    &__header {
      position: relative;
    }

    &__logo {
      position: absolute;
      right: -20px;
      top: -20px;
    }
  }


@media all and (min-width: 768px) {
  font-size: 18px;

  p {
    text-align: justify;
  }
}
}
}
</style>
