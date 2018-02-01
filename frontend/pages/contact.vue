<template>
<div class="page page_contact">
  <v-container class="page__inner pa-0">
    <v-layout column class="page__content black--text">
      <section>
        <div>
          <h2 class="mb-3">Контакты</h2>
        </div>
        <div class="contacts__section">
          <p>Телефон в Москве:</p>
          <p class="pl-4"><a href="tel:+74952800575" class="primary--text lighten-1">+7 (495) 280 0575</a></p>
          <p class="pl-4"><a href="mailto:info@avktechno.com" class="primary--text lighten-1">info@avktechno.com</a></p>
          <p>Наши менеджеры:</p>
          <p class="pl-4">Екатерина:</p>
          <p class="pl-4"><a href="tel:+79776900403" class="primary--text lighten-1">+7 (977) 690 0403</a></p>
          <p class="pl-4"><a href="mailto:e.kanaeva@avktechno.com" class="primary--text lighten-1">e.kanaeva@avktechno.com</a></p>
        </div>
        <div class="contacts__section">
          <p>Адрес офиса в Москве:</p>
          <p class="pl-4 mb-4">
            г. Москва, Дмитровское шоссе, ул. Дубнинская 81. Склад "Евра 4"
          </p>

          <gmap-map
          class="page__map mb-5"
          :center="maps.moscow.center"
          :zoom="maps.moscow.zoom">
            <gmap-marker
            :position="maps.moscow.center"/>
          </gmap-map>

          <p>Адрес офиса в Санкт-Петербурге:</p>
          <p class="pl-4 mb-4">
            Ленинградская обл., Тельмановское с.п., автодорога "Подъезд к г.Колпино", дом 5. Склад "Евра 4"
          </p>

          <gmap-map
          class="page__map"
          :center="maps.peter.center"
          :zoom="maps.peter.zoom">
            <gmap-marker
            :position="maps.peter.center"/>
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
    };
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.page_contact {
.page {
  p {
    text-align: left;
  }

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
.page {
  font-size: 17px;

  p {
    text-align: justify;
  }
}
}

}
}
</style>
