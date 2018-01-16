<template>
  <v-layout
  v-if="model"
  class="page"
  column>
    <div class="page__header">
      <h1 class="text-xs-left text-md-center">Страница бренда {{model.name}}</h1>
    </div>
    <shop-entity-exposition
    :data="collections"
    :type="type"
    :subtype="subtype"
    is-editable/>
  </v-layout>
</template>



<script>
import ShopEntityExposition from '~/domains/shop/ShopEntityExposition.vue';
import { ENTITY_TYPES } from '~/domains/barrel.types';
import {
  FILTER_ENTITY_AVAILABLE_SET,
  FILTER_DROP,
} from '~/domains/barrel.state';
import { cloneDeep } from 'lodash/fp';

export default {
  name: 'page-brand',
  layout: 'hard',
  components: {
    ShopEntityExposition,
  },
  data() {
    return {
      type: ENTITY_TYPES.category,
      subtype: ENTITY_TYPES.product,
      hiddenType: ENTITY_TYPES.brand,
    };
  },
  computed: {
    model() { return this.$store.getters.entity(ENTITY_TYPES.brand, this.$route.params.id); },
    collections() {
      const { state, getters } = this.$store;
      const { filter } = state;

      return this.model.refs[this.type]
        .filter(id => filter.chosen[this.type].indexOf(id) !== -1)
        .map((id) => {
          const collectionModel = getters.entity(this.type, id);
          const collection = {
            model: collectionModel,
            items: collectionModel.refs[this.subtype]
              .filter(id => this.model.refs[ENTITY_TYPES.product].indexOf(id) !== -1)
              .map((id) => {
                const item = cloneDeep(getters.entity(this.subtype, id));
                if (item.info) {
                  item.info = item.info[this.hiddenType];
                }
                return item;
              }),
          };

          return collection;
        });
    },
  },
  created() {
    const { commit, getters } = this.$store;
    const items = [];
    const subitems = [];
    this.model.refs[this.type]
      .forEach((id) => {
        const { name, refs } = getters.entity(this.type, id);
        items.push({ id, name });
        refs[this.subtype].forEach((id) => {
          const { name } = getters.entity(this.subtype, id);
          subitems.push({ id, name });
        });
      });

    commit(FILTER_DROP);
    let COMMIT;
    COMMIT = FILTER_ENTITY_AVAILABLE_SET(this.type);
    commit(COMMIT, items);
    COMMIT = FILTER_ENTITY_AVAILABLE_SET(this.subtype);
    commit(COMMIT, subitems);
    COMMIT = FILTER_ENTITY_AVAILABLE_SET(this.hiddenType);
    commit(COMMIT, [{ id: this.model.id, name: this.model.name }]);
  },
};
</script>
