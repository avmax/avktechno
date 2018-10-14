<template>
<div class="page page_about">
  <v-container class="page__inner px-0 py-4">
    <v-layout class="page__header" justify-space-between>
      <h2 class="mb-3">О компании</h2>
      <v-avatar size="96px" class="page__logo hidden-sm-and-down ml-1"><img src="/baroid.logo.png" alt="Baroid logo"></v-avatar>
    </v-layout>
    <v-layout column class="page__content">
      <section>
        <p>
          Компания <strong>БЕНТО КЛУБ</strong> - официальный дилер компании <strong><a href="http://otex.su/">Отэкс</a></strong> <v-avatar class="ml-1 hidden-md-and-up"><img src="/oteks.logo.jpg" alt="Otex logo"></v-avatar> 	<br>
          Наша компания - официальный дилер компании Отэкс, крупнейшего производителя бентонитов и полимеров БЕНТЕКС в России.
        </p>
      </section>

      <v-divider class="my-4"/>

      <!-- <section> -->
        <!-- <div> -->
          <!-- <h2 class="mb-3">О Компании</h2> -->
        <!-- </div> -->
          <!-- <p>Компания <strong>БЕНТО КЛУБ</strong> - официальный дилер <strong>BAROID (HALLIBURTON)</strong> в Российской Федерации.</p> -->
          <!-- <p>Компания <strong>БЕНТО КЛУБ</strong> на рынке уже 6 лет и за это время она прошла путь от только что зародившейся, до одной из самых востребованных компаний, осуществляющих поставку широкого ассортимента продукции: утсановки горизонтально-направленного бурения и комплектующих к ним, горно-шахтное оборудование и устаноновки для микротоннелирования, оборудование для геотермального отопления, а также запчасти для вышеуказанного оборудования от ведущих  заводов производителей! </p> -->
          <!-- <p>Компания <strong>БЕНТО КЛУБ</strong> с 2010 года обзавелась своими филиалами в таких крупных промышленных регионах, как Урал, Сибирь и Ставропольский край, где сосредоточено огромное количество наших партнеров. Но мы не собираемся останавливаться на достигнутом и всегда будем стремиться к еще большим достижениям, успехам и победам!</p> -->
      <!-- </section> -->
      <!-- <section>
        <div>
          <h2 class="mb-3">Наши возможности</h2>
        </div>
        <p>Компания <strong>БЕНТО КЛУБ</strong> - официальный дилер <strong>BAROID (HALLIBURTON)</strong> в Российской Федерации.</p>
        <p>Компания <strong>БЕНТО КЛУБ</strong> появилась на свет в недалеком 2010 году, но за это время смогла покорить сердца своих заказчиков и партнеров. Мы с радостью осуществим Вашу мечту и поставим именно ту технику, которую Вы выбрали из обширного мира производителей. </p>
        <p>Нам доставляет огромное удовольствие работать по всей России и иметь партнеров в самых удаленных ее точках. При этом больше всего поставок осуществляется в  Сибирь, Урал и Ставропольский край с их крупнейшими городами и развитыми регионами, в которых современные технологии ГНБ, микротоннелирование и горно-шахтная промышленность развивается огромными шагами!</p>
        <p>Установки для горизонтально-направленного бурения, а также запчасти и комплектующие дляних, установки для открытых работ, горно-шахтное оборудование и технику для микротоннелирования, комплекты геотермального оборудования, буровые растворы <strong>Baroid</strong> и многое другое входит в нашу компетенцию.</p>
        <p><strong>БЕНТО КЛУБ</strong> осуществляет продажу и покупку новой и бывшей в употреблении техники по наиболее выгодным для вас ценам, предоставляя своим клиентам лучшие условия. Наша компания осуществляет ремонт, сервисное и гарантийное обслуживание. Мы предлагаем нашим клиентам и партнерам самые выгодные условия сотрудничества, оптимальные цены и широкий ассортимент продукции. Вам понравится быть нашим партнером.</p>
      </section> -->

      <section class="partners">
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
      </section>
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
