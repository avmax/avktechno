<template>
<div @keyup.esc="handleAbort">
  <h3>{{isTypeCreate ? 'Создать бренд' : 'Редактировать бренд'}}</h3>
  <v-form
    ref="form"
    @keyup.enter.native="handleSubmit"
    v-model="isValid">
    <v-layout column>
      <template v-for="(key, index) in fields">
        <v-text-field
        v-model="model[key]"
        :label="labels[key]"
        :multi-line="controls[key] === 'textfield'"
        :rules="rules[key]"
        :autofocus="!index"
        @input="onFormControlChange"
        :key="key"/>
      </template>

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
import EditionPanel from './EditionPanel';
// eslint-disable-next-line
import { validatorRequired } from '~/utils/validators.js';

export default {
  name: 'shop-edition-panel-category',
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
      },
    };
  },
};
</script>
