<template>
<v-layout class="entity-exposition" column>

  <v-layout v-if="!collections || !collections.length" justify-center align-center>
    <div class="display-1 text-xs-center my-4">Страница пуста</div>
  </v-layout>

  <edition>
    <template scope="{ add, edit, remove }">

      <edition-ghost @add="add(type)" fluid/>

      <template v-for="c in collections">
        <entity-collection :key="c.id"
          :title="c.title"
          :name="c.name"
          :link="{ name: `${type}-id`, params: { id: c.id }}"
        >
          <edition-controls
            slot="header"
            is-edit
            is-remove
            @edit="edit(type, c.id)"
            @remove="remove(type, c.id)"
            style="margin-bottom: -10px;"
          />
          <edition-ghost @add="add(subtype, type, c.id)"/>
          <v-flex v-for="s in c.refs[subtype]" :key="s.id" xs12 sm6 lg4>
            <edition>
              <component
                :is="itemComponent"
                v-bind="getItem(s)"
                :link="{ name: `${subtype}-id`, params: { id: s }}"
              />
              <edition-controls
                slot="controls"
                is-edit
                is-remove
                @edit="edit(subtype, s)"
                @remove="remove(subtype, s)"
              />
            </edition>
          </v-flex>
        </entity-collection>
        <v-divider :key="c.id" class="mb-4 mt-5"/>
      </template>
    </template>
  </edition>
</v-layout>
</template>

<script>
import { ENTITY_TYPES } from '~/domains/barrel.types';
import EntityCollection from '~/domains/shop/EntityCollection/base.vue';
import EntityItemProduct from '~/domains/shop/EntityItem/product.vue';
import EntityItemBrand from '~/domains/shop/EntityItem/brand.vue';
import EntityItemCategory from '~/domains/shop/EntityItem/category.vue';
import Edition from '~/domains/edition/Edition/edition';
import EditionControls from '~/domains/edition/Edition/controls';
import EditionGhost from '~/domains/edition/Edition/ghost';


export default {
  name: 'shop-entity-exposition',
  components: {
    EntityCollection,
    EntityItemProduct,
    EntityItemBrand,
    EntityItemCategory,
    Edition,
    EditionControls,
    EditionGhost,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    subtype: {
      type: String,
      required: true,
    },
  },
  computed: {
    itemComponent() {
      let cmp;
      switch (this.subtype) {
        case (ENTITY_TYPES.product):
          cmp = EntityItemProduct;
          break;
        case (ENTITY_TYPES.category):
          cmp = EntityItemCategory;
          break;
        case (ENTITY_TYPES.brand):
          cmp = EntityItemBrand;
          break;
        default:
          cmp = EntityItemProduct;
      }

      return cmp;
    },
    collections() {
      return this.$store.getters.entities(this.type);
    },
  },
  methods: {
    getItem(id) {
      return this.$store.getters.entity(this.subtype, id);
    },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.entity-exposition {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
}
</style>
