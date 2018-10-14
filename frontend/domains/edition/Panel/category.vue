<template>
<div @keyup.esc="handleAbort" @keyup.ctrl.enter="handleSubmit">
  <template v-if="model.depth === 1">
    <h3 class="mb-3">{{isTypeCreate ? 'Создать категорию' : 'Редактировать категорию'}}</h3>
  </template>
  <template v-else>
    <h3 class="mb-3">{{isTypeCreate ? 'Создать подкатегорию' : 'Редактировать подкатегорию'}}</h3>
  </template>
  <v-form
    ref="form"
    @keyup.enter.native="handleSubmit"
    v-model="isValid"
    lazy-validation>
    <v-layout column>
      <v-text-field
      color="secondary"
      v-model="model.name"
      @input="onFormControlChange"
      label="Название"
      autofocus
      :rules="rules.name"
      validate-on-blur
      required/>

      <!-- <v-divider class="mb-4 mt-3"/>

      <v-layout
        v-for="(s, index) in model.refs.category"
        :key="`s-${index}`"
        row
      >
        <v-flex xs11>
          <v-text-field
            color="secondary"
            v-model="model.refs.category[index]"
            @input="onFormControlChange"
            label="Имя подкатегори"
            :rules="rules.subcategory"
            validate-on-blur
            required
          />
        </v-flex>
        <v-flex xs1></v-flex>
      </v-layout>
      <v-btn
        @click="subcategoryAdd"
        color="secondary"
        class="ma-0"
      >
        добавить подкатегорию
      </v-btn> -->

      <v-divider class="mb-4 mt-3"/>

      <v-btn
      color="primary"
      @click="handleSubmit()"
      :disabled="!isValid">
        Сохранить изменения
      </v-btn>
      <v-btn
      color="blue-grey lighten-1"
      @click="handleAbort()">
        Прекратить изменения
      </v-btn>
    </v-layout>
  </v-form>
  <h4 v-if="message" class="red--text text--lighten-1 mt-2 text-xs-center">{{message}}</h4>
</div>
</template>


<script>
import Vue from 'vue';
import Panel from './base';
// eslint-disable-next-line
import { validatorRequired } from '~/utils/validators.js';

export default {
  name: 'edition-panel-category',
  mixins: [Panel],
  data() {
    return {
      rules: {
        name: [validatorRequired()],
        // subcategory: [validatorRequired()],
      },
    };
  },
  created() {
    const { model } = this;
    if (!model.refs) {
      Vue.set(model, 'refs', { });
    }
  },
  // created() {
  //   const model = this.model;
  //   if (!model.refs) {
  //     Vue.set(model, 'refs', { category: [] });
  //   }
  // },
  // methods: {
  //   subcategoryRemove(index) {
  //     const model = this.model;
  //     model.refs.category.slice(index, 1);
  //   },
  //   subcategoryAdd() {
  //     const model = this.model;
  //     model.refs.category.push(null);
  //   },
  // },
};
</script>
