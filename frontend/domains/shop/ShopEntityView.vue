<template>
<div
class="shop-entity-view py-2"
:class="{ 'shop-entity-view_loading' : !isReady }">
  <v-fade-transition>
    <v-card v-if="isReady && model" class="shop-entity-view__card">
      <v-card-media class="shop-entity-view__card-media" :src="model.imgUrl"/>
      <v-card-title class="shop-entity-view__card-name display-1">
        {{model.name}}
        <v-spacer/>
        <v-chip
        class="title"
        v-if="model.price">
          Цена: {{model.price}} {{model.currency}}
        </v-chip>
      </v-card-title>
      <v-card-text v-if="model.title" class="shop-entity-view__card-title headline">{{model.title}}</v-card-text>
      <v-card-text v-if="model.description" class="shop-entity-view__card-description title" v-html="model.description"/>
      <v-divider/>
      <template
      v-for="(feature, index) in model.features">
        <v-card-text
        class="shop-entity-view__card-feature"
        :key="`feature-${index}`">
          <div class="title mb-2" v-if="feature.title">{{feature.title}}</div>
          <v-card-text
          class="shop-entity-view__card-feature-item py-1 pb-"
          v-for="(f, i) in feature.items"
          :key="`feature-${index}-${i}`">
            <div class="shop-entity-view__card-feature-icon"></div>
            <div class="body-2">{{f}}</div>
          </v-card-text>
        </v-card-text>
        <v-divider :key="`feature-${index}`"/>
      </template>
      <v-card-text
      v-if="model.charachteristics && model.charachteristics.length"
      class="shop-entity-view__card-charachteristics-holder">
        <v-card-text
        v-for="(c, i) in model.charachteristics"
        class="shop-entity-view__card-charachteristics pa-0"
        :key="`characteristics-${i}`">
          <div class="title mb-2">{{c.title}}</div>
          <div class="shop-entity-view__card-charachteristics-item mt-1"
          v-for="(item, index) in c.items" :key="`characteristics-${i}-${index}`">
            <span class="shop-entity-view__card-charachteristics-item-key subheading">{{item.key}}:</span>
            <span class="shop-entity-view__card-charachteristics-item-val body-2 pl-2">{{item.val}}</span>
          </div>
        </v-card-text>
      </v-card-text>
      <template v-if="model.footer">
        <v-divider/>
        <v-card-text class="title pb-0">{{model.footer.title}}</v-card-text>
        <v-card-text v-html="model.footer.text"/>
      </template>
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
    @click="edit(type, id)"
    fab small>
      <v-icon color="white">edit</v-icon>
    </v-btn>
    <v-btn
    @click="remove(type, id)"
    fab small>
      <v-icon color="white">clear</v-icon>
    </v-btn>
  </div>
</div>
</template>

<script>
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import CardBase from '~/domains/common/CardBase.vue';
import { isEmpty } from 'lodash/fp';
import { EditableSmart } from './Editable';

export default {
  name: 'shop-entity-view',
  components: {
    CardBase,
    GridLoader,
  },
  mixins: [EditableSmart],
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
    };
  },
  computed: {
    model() { return this.$store.getters.entity(this.type, this.id); },
    isEmpty() { return isEmpty(this.$store.state.shop[this.type][this.id]); },
  },
  mounted() {
    if (this.isEmpty) {
      setTimeout(() => this.isReady = true, 1000);
    } else {
      this.isReady = true;
    }
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.shop-entity-view {
  position: relative;
  width: 100%;
  height: 100%;

  &__card {
    .title {
      line-height: 1.4em !important;
    }

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

    &-charachteristics {
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
  max-width: 720px;
  margin: 0 auto;

  &__card {
    &-media {
      height: 400px !important;
    }

    &-feature {
      &-item {
        display: flex;
        align-items: center;
      }

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

    &-charachteristics {
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

      &-item {
        &-key {
          padding-bottom: 3px;
          border-bottom: 1px solid;
        }
      }
    }
  }
}
}
}
</style>
