<template>
<div
class="shop-entity-view py-2"
:class="{ 'shop-entity-view_loading' : !isReady }">
  <v-fade-transition>
    <v-card v-if="isReady" class="shop-entity-view__card">
      <v-card-media class="shop-entity-view__card-media" :src="model.imgUrl"/>
      <v-card-title class="shop-entity-view__card-title headline">{{model.name}}</v-card-title>
      <v-card-text class="shop-entity-view__card-description title">{{model.title}}</v-card-text>
      <v-card-text
      class="shop-entity-view__card-feature"
      v-for="(f, i) in features"
      :key="`feature-${i}`">
        <div class="shop-entity-view__card-feature-icon"></div>
        <div class="body-2">{{f}}</div>
      </v-card-text>
      <v-card-text
      v-if="characheteristics"
      class="shop-entity-view__card-characheteristics-holder">
        <v-card-text
        v-for="(c, i) in characheteristics"
        class="shop-entity-view__card-characheteristics"
        :key="`characteristics-${i}`">
          <div class="title mb-3">{{c.title}}</div>
          <div class="shop-entity-view__card-characheteristics-item mt-1"
          v-for="(item, index) in c.items" :key="`characteristics-${i}-${index}`">
            <span class="shop-entity-view__card-characheteristics-item-key subheading">{{item.key}}:</span>
            <span class="shop-entity-view__card-characheteristics-item-val body-2 pl-2">{{item.val}}</span>
          </div>
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-fade-transition>

  <div
  v-if="!isReady"
  class="shop-entity-view__ghost">
    <div class="shop-entity-view__ghost-spinner">
      <grid-loader :loading="true"/>
    </div>
  </div>

  <div class="shop-entity-view__controls"
  v-if="isEditionEnabled">
    <v-btn
    @click="edit()"
    fab small>
      <v-icon color="white">edit</v-icon>
    </v-btn>
    <v-btn
    @click="remove()"
    fab small>
      <v-icon color="white">clear</v-icon>
    </v-btn>
  </div>
</div>
</template>

<script>
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import CardBase from '~/domains/common/CardBase.vue';
import ShopEntity from './ShopEntity';

export default {
  name: 'shop-entity-view',
  components: {
    CardBase,
    GridLoader,
  },
  mixins: [ShopEntity],
  props: {
    type: {
      type: String,
      required: true,
      default: null,
    },
    id: {
      type: [String, Number],
      required: true,
      default: null,
    },
  },
  data() {
    return {
      isReady: false,
      features: [
        'Буровая установка JT100 с тягой 445 кН и крутящим моментом 16 270 Н/м - идеальное решение для прокладывания труб на большие расстояния или прокладывания труб большого диаметра.',
        'Кран, входящий в комплектацию установки, предназначен для погрузки и разгрузки кассет со штангами, якорения шнеков анкерной системы, а также может использоваться для подсобных работ.',
        // eslint-disable-next-line
        `Закрытая кабина оператора скомплектована удобной системой управления и имеет прекрасную обзорность. JT100 All Terrain® — единственная буровая установка в своем классе, на которой предусмотрена установка и работа с двумя кассетами штанг. Таким образом, можно с помощью крана на установке поставить сверху дополнительную кассету со штангами и продолжать работать.`,
        'Внедрена система автоматического контроля за свинчиванием буровых штанг, что значительно продлевает сорок их службы.',
        'Благодаря возможности изменять скорость вращения шпинделя во время работы, JT100 All Terrain® является единственной скальной установкой, на которой возможно найти оптимальный баланс скорости вращения шпинделя и крутящего момента.',
        'Двойная рейка и двусторонний привод каретки JT100 All Terrain®, многократно проверены в полевых условиях, отличаются надежностью, долговечностью и помогут справиться с поставленной задачей.',
        'Мощный буровой насос 870 л/мин.',
      ],
      characheteristics: [
        {
          title: 'Размеры',
          items: [
            {
              key: 'Длина',
              val: '9.35м',
            },
            {
              key: 'Ширна',
              val: '2.57м',
            },
            {
              key: 'Высота',
              val: '2.79м',
            },
            {
              key: 'Вес',
              val: '21 400кг',
            },
          ],
        },
        {
          title: 'Буровая штанга',
          items: [
            {
              key: 'Длина',
              val: '4.31м',
            },
            {
              key: 'Диаметр замка',
              val: '114мм',
            },
            {
              key: 'Диамтер штанги',
              val: '92мм',
            },
          ],
        },
        {
          title: 'Буровая штанга',
          items: [
            {
              key: 'Длина',
              val: '4.31м',
            },
            {
              key: 'Диаметр замка',
              val: '114мм',
            },
            {
              key: 'Диамтер штанги',
              val: '92мм',
            },
            {
              key: 'Длина',
              val: '4.31м',
            },
            {
              key: 'Диаметр замка',
              val: '114мм',
            },
            {
              key: 'Диамтер штанги',
              val: '92мм',
            },
            {
              key: 'Длина',
              val: '4.31м',
            },
            {
              key: 'Диаметр замка',
              val: '114мм',
            },
            {
              key: 'Диамтер штанги',
              val: '92мм',
            },
          ],
        },
        {
          title: 'Буровая штанга',
          items: [
            {
              key: 'Длина',
              val: '4.31м',
            },
            {
              key: 'Диаметр замка',
              val: '114мм',
            },
            {
              key: 'Диамтер штанги',
              val: '92мм',
            },
            {
              key: 'Длина',
              val: '4.31м',
            },
            {
              key: 'Диаметр замка',
              val: '114мм',
            },
            {
              key: 'Диамтер штанги',
              val: '92мм',
            },
            {
              key: 'Длина',
              val: '4.31м',
            },
            {
              key: 'Диаметр замка',
              val: '114мм',
            },
            {
              key: 'Диамтер штанги',
              val: '92мм',
            },
          ],
        },
      ],
    };
  },
  computed: {
    model() { return this.$store.getters.entity(this.type, this.id); },
  },
  mounted() {
    console.log('inited');
    if (this.isEmpty) {
      setTimeout(() => this.isReady = true, 1000);
    } else {
      this.isReady = true;
    }
  },
};
</script>

<style lang="scss">
#avmax {
.shop-entity-view {
  position: relative;
  width: 100%;
  height: 100%;

  &__card {
    &-media {
      height: 200px !important;
      background-color: white;

      .card__media__background {
        background-size: 100% 100% !important;
      }
    }

    &-description {
      font-weight: 400;
    }

    &-characheteristics {
      padding-left: 0;
      padding-right: 0;
    }
  }

  &__controls {
    position: absolute;
    width: 100%;
    top: 10px;
    padding-right: 5px;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__ghost {
    position: relative;
    width: 100%;
    height: 100%;

    &-spinner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}


@media all and (min-width: 768px) {
.shop-entity-view {
  max-width: 60%;
  margin: 0 auto;

  &__card {
    &-media {
      height: 400px !important;
    }

    &-feature {
      display: flex;
      align-items: center;

      &-icon {
        width: 30px;
        min-width: 30px;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &::before {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 100%;
          background: #303030;
        }
      }
    }

    &-characheteristics {
      display: inline-block;
      width: 50%;
      max-width: 300px;
      padding-right: 20px;

      &-holder {
        padding-left: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
    }
  }
}
}
}
</style>
