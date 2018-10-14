<template>
<div class="page page_contact">
  <v-container class="page__inner pa-0">
    <v-layout column class="page__content black--text">
      <section>
        <div>
          <h2 class="mb-3">Контакты</h2>
        </div>
        <div class="contacts__section">
          <p class="title pt-3">Наши менеджеры:</p>
          <p class="pl-4"><a href="tel:+74952800554" class="secondary--text lighten-1">+7 (495) 280 05 54</a></p>
          <p class="pl-4"><a href="tel:+74953746724" class="secondary--text lighten-1">+7 (495) 374 67 24</a></p>
          <p class="pl-4"><a href="mailto:e.nozdrina@bento-club.ru" class="secondary--text lighten-1">e.nozdrina@bento-club.ru</a></p>
          <p class="pl-4"><a href="mailto:info@bento-club.ru" class="secondary--text lighten-1">info@bento-club.ru</a></p>
        </div>
        <div class="contacts__section">
          <p class="title pt-3">Адрес офиса и склада:</p>
          <p class="pl-4 mb-4">
            Московская область, г.Котельники, Дзержинское шоссе, д.2 <br>
            Загрузка на складе ежедневно с понедельника-по пятницу с 9-00 до 18-00.
          </p>
          <gmap-map
          class="page__map mb-5"
          :center="maps.office.center"
          :zoom="maps.office.zoom">
            <gmap-marker
            :position="maps.office.center"/>
          </gmap-map>
        </div>
      </section>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
  layout: 'base',
  data() {
    return {
      maps: {
        office: {
          center: {
            lat: 55.6574046,
            lng: 37.8587071,
          },
          zoom: 17,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.page_contact {
  p {
    text-align: left;
  }

  .page {

    &__map {
      height: 300px;
      width: 100%;
    }

    &__content {
      position: relative;
      z-index: 1;
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
