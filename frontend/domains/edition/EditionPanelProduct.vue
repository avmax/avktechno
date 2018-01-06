<template>
<div @keyup.esc="handleAbort">
  <h3>{{isTypeCreate ? 'Создать продукт' : 'Редактировать продукт'}}</h3>
  <v-form
    ref="form"
    @keyup.enter.native="handleSubmit"
    v-model="isValid">
    <v-layout column>
      <template v-for="(key, index) in fields">
        <v-text-field
        v-model="model[key]"
        @input="onFormControlChange"
        :label="labels[key]"
        :multi-line="controls[key] === 'textfield'"
        :autofocus="!index"
        :rules="rules[key]"
        :key="key"/>
      </template>

      <v-select
      label="Выберите категории"
      :items="categories"
      v-model="model.refs.category"
      item-text="name"
      item-value="id"
      multiple
      max-height="400"
      @input="onFormControlChange"
      persistent-hint/>

      <v-select
      label="Выберите бренд"
      :items="brands"
      v-model="model.refs.brand"
      item-text="name"
      item-value="id"
      max-height="400"
      @input="onFormControlChange"
      persistent-hint/>

      <v-btn
      color="primary"
      @click="handleSubmit()"
      :disabled="!isValid">
        Сохранить изменения
      </v-btn>
      <v-btn
      color="primary"
      @click="handleAbort()">
        Прекратить изменения
      </v-btn>
    </v-layout>
  </v-form>
  <h4 v-if="message">{{message}}</h4>
</div>
</template>



<script>
import { defaultsDeep } from 'lodash/fp';
import EditionPanel from './EditionPanel';
// eslint-disable-next-line
import { validatorRequired } from '~/utils/validators.js';

export default {
  name: 'shop-edition-panel-product',
  mixins: [EditionPanel],
  data() {
    return {
      fields: ['name', 'title', 'imgUrl'],
      labels: {
        name: 'Название',
        title: 'Заголовок',
        imgUrl: 'URL картинки',
      },
      controls: {
        title: 'textfield',
      },
      rules: {
        name: [validatorRequired()],
        refs: {
          category: [validatorRequired()],
          brand: [validatorRequired()],
        },
      },
    };
  },
  computed: {
    brands() {
      const brands = this.$store.state.shop.brand;
      return Object.values(brands).map(({ id, name }) => ({ id, name }));
    },
    categories() {
      const categories = this.$store.state.shop.category;
      return Object.values(categories).map(({ id, name }) => ({ id, name }));
    },
  },
  beforeMount() {
    this.model = this.value ? defaultsDeep({}, this.value) : {};
    const { refs } = this.model;
    refs.brand = refs.brand ? refs.brand[0] : [];
    refs.category = refs.category || [];
    this.model.refs = refs;
  },
};
</script>
