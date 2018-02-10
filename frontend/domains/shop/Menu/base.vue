<template>
  <v-list class="py-0 shop-menu">
    <template
      v-for="item in menu"
      v-if="+item.depth === 1"
    >
      <v-list-tile
        v-if="item.refs.product.length !== 0"
        :to="{ name: 'category-id', params: { id: item.id } }"
        :key="item.id"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-group
        v-if="item.refs.product.length === 0"
        :value="item.isActive"
        :key="item.id"
      >
        <v-list-tile
          slot="item"
          :to="{ name: 'category-id', params: { id: item.id } }"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile
          v-for="id in item.refs.category"
          :to="{ name: 'category-id', params: { id: id } }"
          :key="id"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ getCategory(id).name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </template>
  </v-list>
</template>


<script>
export default {
  computed: {
    menu() {
      const { getters } = this.$store;
      const categories = getters.categories;
      const items = categories.map(c => ({ ...c, isActive: false }));

      return items;
    },
  },
  methods: {
    getCategory(id) {
      const { getters } = this.$store;
      const category = getters.category;
      return category(id);
    },
  },
};
</script>

<style lang="scss">
#avmax {
.shop-menu {
  .list--group .list__tile {
    padding-left: 32px;
  }
}
}
</style>
