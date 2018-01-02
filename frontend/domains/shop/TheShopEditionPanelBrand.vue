<template>
<div>
  <h3>Редактировать брэнд</h3>

  <v-form
    ref="form"
    v-model="isValid">
    <v-layout column>
      <template v-for="key in fields">
        <v-text-field
        v-model="model[key]"
        @input="onFormControlChange"
        :label="labels[key]"
        :multi-line="controls[key] === 'textfield'"
        :rules="rules[key]"
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
</div>
</template>



<script>
import { isEmpty } from 'lodash/fp';
import TheShopEditionPanelEntity from './TheShopEditionPanelEntity';
// eslint-disable-next-line
import { validatorRequired } from '~/utils/validators.js';

export default {
  name: 'the-shop-edition-panel-brand',
  mixins: [TheShopEditionPanelEntity],
  data() {
    return {
      isValid: true,
      model: null,
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
        title: [validatorRequired()],
        imgUrl: [validatorRequired()],
      },
    };
  },
  beforeMount() {
    if (isEmpty(this.value)) {
      this.model = {
        title: null,
        description: null,
        imgUrl: null,
      };
    } else {
      this.model = this.value;
    }
  },
};
</script>
