<template>
  <v-layout class="page" column>
    <div class="page__header">
      <h1 class="text-xs-left text-md-center">Все продукты</h1>
    </div>
    <shop-entity-exposition
    :type="type"
    :subtype="subtype"
    :data="collections"
    is-editable/>
  </v-layout>
</template>


<script>
import ShopEntityExposition from '~/domains/shop/ShopEntityExposition.vue';
import { ENTITY_TYPES } from '~/domains/barrel.types';
import {
  FILTER_TYPE_SET,
  FILTER_SUBTYPE_SET,
  FILTER_ENTITY_AVAILABLE_SET,
  FILTER_DROP,
} from '~/domains/barrel.state';
import { mapState } from 'vuex';
import { intersection, defaultsDeep } from 'lodash/fp';

export default {
  name: 'page-categories-brands',
  layout: 'hard',
  components: {
    ShopEntityExposition,
  },
  computed: {
    collections() {
      const { state, getters } = this.$store;
      const { filter } = state;

      let collections = getters.entities(this.type);
      collections = collections
        .filter(id => filter.chosen[this.type].indexOf(id) !== -1)
        .map((id) => {
          const collectionModel = getters.entity(this.type, id);
          const collection = {
            model: collectionModel,
            items: collectionModel.refs[this.subtype]
              .filter(id => filter.chosen[this.subtype].indexOf(id) !== -1)
              .map((id) => {
                const item = defaultsDeep({}, getters.entity(this.subtype, id));
                if (item.info) {
                  item.info = item.info[this.hiddenType];
                }
                return item;
              })
              .filter(item => intersection(
                item.refs[this.hiddenType],
                filter.chosen[this.hiddenType]).length !== 0,
              )
              .reverse(),
          };

          return collection;
        }).reverse();

      return collections;
    },
    hiddenType() {
      return Object.values(ENTITY_TYPES).filter(v => v !== this.type && v !== this.subtype)[0];
    },
    ...mapState({
      type: ({ filter }) => filter.type,
      subtype: ({ filter }) => filter.subtype,
    }),
  },
  created() {
    const { commit, getters } = this.$store;
    commit(FILTER_DROP);
    commit(FILTER_TYPE_SET, ENTITY_TYPES.category);
    commit(FILTER_SUBTYPE_SET, ENTITY_TYPES.product);
    Object.values(ENTITY_TYPES).forEach((type) => {
      const COMMIT = FILTER_ENTITY_AVAILABLE_SET(type);
      let payload = getters.entities(type).map(id => getters.entity(type, id));
      payload = payload.map(v => ({ id: v.id, name: v.name }));
      commit(COMMIT, payload);
    });
  },
};
</script>
