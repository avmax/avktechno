<template>
<div @keyup.esc="handleAbort" @keyup.ctrl.enter="handleSubmit">
  <h3 class="mb-3">{{isTypeCreate ? 'Создать бренд' : 'Редактировать бренд'}}</h3>
  <v-form
    ref="form"
    @keyup.enter.native="handleSubmit"
    v-model="isValid"
    lazy-validation>
    <v-layout column>
      <v-text-field
      v-model="model.name"
      @input="onFormControlChange"
      label="Название"
      autofocus
      :rules="rules.name"
      validate-on-blur
      required/>

      <input-file label="Картинка" v-model="model.image"/>

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
import InputFile from '~/domains/common/InputFile.vue';
// eslint-disable-next-line
import { validatorRequired } from '~/utils/validators.js';
import Panel from './base';

export default {
  name: 'edition-panel-category',
  mixins: [Panel],
  components: { InputFile },
  data() {
    return {
      rules: {
        name: [validatorRequired()],
      },
    };
  },
};
</script>
