<template>
<div class="page page_contact">
  <v-container class="page__inner pa-0">
    <v-layout column class="page__content black--text">
      <section>
        <div>
          <h2 class="mb-3">Контакты</h2>
        </div>
        <div class="contacts__section">
          <p class="title pt-3">Телефон в Москве:</p>
          <p class="pl-4"><a href="tel:+74952800575" class="primary--text lighten-1">+7 (495) 280 05 75</a></p>
          <p class="pl-4"><a href="tel:+74994901396" class="primary--text lighten-1">+7 (499) 490 13 96</a></p>
          <p class="pl-4"><a href="mailto:info@avktechno.com" class="primary--text lighten-1">info@avktechno.com</a></p>
          <p class="title pt-3">Наши менеджеры:</p>
          <p class="pl-4">Екатерина:</p>
          <p class="pl-4"><a href="tel:+79776900403" class="primary--text lighten-1">+7 (977) 690 04 03</a></p>
          <p class="pl-4"><a href="mailto:e.kanaeva@avktechno.com" class="primary--text lighten-1">e.kanaeva@avktechno.com</a></p>
          <p class="pl-4">Алексей:</p>
          <p class="pl-4"><a href="tel:+79268182926" class="primary--text lighten-1">+7 (926) 818 29 26</a></p>
          <p class="pl-4"><a href="mailto:sale@avktechno.com" class="primary--text lighten-1">sale@avktechno.com</a></p>
        </div>
        <div class="contacts__section">
          <p class="title pt-3">Адрес офиса в Москве:</p>
          <p class="pl-4 mb-4">
            ОФИС: 140033, Московская область, Люберецкий р-н, п.Малаховка, ул. Жуковского, д. 30 каб.15
          </p>
          <gmap-map
          class="page__map mb-5"
          :center="maps.office.moscow.center"
          :zoom="maps.office.moscow.zoom">
            <gmap-marker
            :position="maps.office.moscow.center"/>
          </gmap-map>

          <p class="title pt-3">Адрес склада в Москве:</p>
          <p class="pl-4 mb-4">
            г. Москва, Дмитровское шоссе, ул. Дубнинская 81. Склад "Евра 4"
          </p>
          <gmap-map
          class="page__map mb-5"
          :center="maps.stock.moscow.center"
          :zoom="maps.stock.moscow.zoom">
            <gmap-marker
            :position="maps.stock.moscow.center"/>
          </gmap-map>

          <p class="title pt-3">Адрес складa в Санкт-Петербурге:</p>
          <p class="pl-4 mb-4">
            Ленинградская обл., Тельмановское с.п., автодорога "Подъезд к г.Колпино", дом 5. Склад "Евра 4"
          </p>
          <gmap-map
          class="page__map"
          :center="maps.stock.peter.center"
          :zoom="maps.stock.peter.zoom">
            <gmap-marker
            :position="maps.stock.peter.center"/>
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
          moscow: {
            center: {
              lat: 55.642580,
              lng: 38.009373,
            },
            zoom: 17,
          },
        },
        stock: {
          moscow: {
            center: {
              lat: 55.891441,
              lng: 37.555696,
            },
            zoom: 17,
          },
          peter: {
            center: {
              lat: 59.725295,
              lng: 30.609047,
            },
            zoom: 17,
          },
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
