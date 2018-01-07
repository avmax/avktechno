<template>
<div @keyup.esc="handleAbort">
  <h3>{{isTypeCreate ? 'Создать категорию' : 'Редактировать категорию'}}</h3>
  <v-form
    ref="form"
    @keyup.enter.native="handleSubmit"
    v-model="isValid">
    <v-layout column>
      <v-text-field
      v-model="model.name"
      @input="onFormControlChange"
      label="Название"
      autofocus
      :rules="rules.name"
      required/>

      <v-text-field
      v-model="model.title"
      @input="onFormControlChange"
      label="Заголовок"
      multi-line
      :rows="1"/>

      <v-btn
      color="primary"
      class="mt-3"
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
import EditionPanel from './EditionPanel';
// eslint-disable-next-line
import { validatorRequired } from '~/utils/validators.js';

export default {
  name: 'shop-edition-panel-category',
  mixins: [EditionPanel],
  data() {
    return {
      rules: {
        name: [validatorRequired()],
      },
    };
  },
};
</script>
