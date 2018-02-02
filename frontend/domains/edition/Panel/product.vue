<template>
<div @keyup.esc="handleAbort" @keyup.ctrl.enter="handleSubmit">
  <h3 class="mb-3">{{isTypeCreate ? 'Создать продукт' : 'Редактировать продукт'}}</h3>
  <v-form
    ref="form"
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

      <v-text-field
      v-model="model.identificator"
      @input="onFormControlChange"
      label="Vin номер"
      :rules="rules.vin"
      validate-on-blur
      required/>

      <v-select
      label="Выберите категорию"
      :items="categories"
      v-model="model.refs.category"
      item-text="name"
      item-value="id"
      max-height="400"
      @input="onFormControlChange"
      persistent-hint
      color="white"/>

      <v-select
      label="Выберите бренд"
      :items="brands"
      v-model="model.refs.brand"
      item-text="name"
      item-value="id"
      max-height="400"
      @input="onFormControlChange"
      persistent-hint
      color="white"/>

      <v-layout
      row wrap
      justify-space-between>
        <v-flex xs8>
          <v-text-field
          label="Цена"
          @input="onFormControlChange"
          type="number"
          v-model="model.price"
          :rules="rules.price"
          required
          validate-on-blur/>
        </v-flex>
        <v-flex xs3>
          <v-select
          label="Выберите Валюту"
          :items="['RUB', 'USD', 'EUR']"
          v-model="model.currency"
          item-value="id"
          max-height="400"
          @input="onFormControlChange"
          :rules="rules.price"
          validate-on-blur
          required
          persistent-hint/>
        </v-flex>
      </v-layout>

      <v-text-field
        label="Количество в наличии"
        @input="onFormControlChange"
        type="number"
        v-model="model.amount"
        :rules="rules.amount"
        required
        validate-on-blur
      />

      <v-divider class="my-3"/>

      <v-text-field
      v-model="model.title"
      @input="onFormControlChange"
      label="Заголовок"
      multi-line
      :rows="1"/>

      <v-text-field
      v-model="model.description"
      @input="onFormControlChange"
      label="Описание"
      multi-line
      :rows="1"/>

      <v-text-field
      v-model="model.descriptionShort"
      @input="onFormControlChange"
      label="Короткое описание"
      multi-line
      :rows="1"/>

      <input-file label="Картинка" v-model="model.image"/>

      <v-text-field
      v-model="model.footer.title"
      @input="onFormControlChange"
      label="Заголовок подвала"/>

      <v-text-field
      v-model="model.footer.text"
      @input="onFormControlChange"
      label="Текст подвала"
      multi-line
      :rows="1"/>

      <v-divider class="my-3"/>

      <div class="features my-3">
        <v-form
        class="features__item mb-3"
        v-for="(f, index) in model.features"
        :key="`features-${index}`">
          <div class="features__item-header">
            <v-text-field
            v-model="model.features[index].title"
            @input="onFormControlChange"
            label="Заголовок списка"/>
            <v-btn
            @click="featuresRemove(index)"
            fab small color="error">
              <v-icon>
                remove
              </v-icon>
            </v-btn>
          </div>
          <div class="features__item-list"
          v-for="(item, i) in model.features[index].items"
          :key="`feature-${index}-${i}`">
            <v-text-field
            v-model="model.features[index].items[i]"
            @input="onFormControlChange"
            label="Элемент списка"
            multi-line
            :rows="1"
            :rules="rules.features"
            validate-on-blur
            required/>
            <v-btn
            @click="featuresItemRemove(index, i)"
            fab small color="red lighten-4">
              <v-icon>
                remove
              </v-icon>
            </v-btn>
          </div>
          <v-btn class="ma-0" @click="featuresItemAdd(index)">добавить</v-btn>
        </v-form>
        <v-btn color="secondary" class="ma-0" @click="featuresAdd">добавить список</v-btn>
      </div>

      <v-divider class="my-3"/>

      <div class="charachteristics my-3">
        <v-form
        class="charachteristics__item mb-3"
        v-for="(c, index) in model.charachteristics"
        :key="`charachteristics-${index}`">
          <div class="charachteristics__item-header">
            <v-text-field
            v-model="model.charachteristics[index].title"
            @input="onFormControlChange"
            label="Заголовок таблицы"/>
            <v-btn
            @click="charachteristicsRemove(index)"
            fab small color="error">
              <v-icon>
                remove
              </v-icon>
            </v-btn>
          </div>
          <v-layout
          v-for="(item, i) in c.items"
          :key="`charachteristics-${index}-${i}`">
            <v-flex xs5>
              <v-text-field
              v-model="model.charachteristics[index].items[i].key"
              @input="onFormControlChange"
              label="свойство"
              :rules="rules.charachteristics"
              validate-on-blur
              required/>
            </v-flex>
            <v-flex xs5 class="ml-2">
              <v-text-field
              v-model="model.charachteristics[index].items[i].val"
              @input="onFormControlChange"
              label="значение"
              :rules="rules.charachteristics"
              validate-on-blur
              required/>
            </v-flex>
            <v-flex xs1>
              <v-btn
              @click="charachteristicsRemoveItem(index, i)"
              fab small color="red lighten-4">
                <v-icon>
                  remove
                </v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-btn class="ma-0 mb-1" @click="charachteristicsAddItem(index)">добавить</v-btn>
        </v-form>
        <v-btn color="secondary" class="ma-0" @click="charachteristicsAdd">добавить характеристику</v-btn>
      </div>

      <v-divider class="my-3"/>

      <v-btn
      color="success"
      class="mt-3"
      @click="handleSubmit()"
      :disabled="!isValid">
        Сохранить изменения
      </v-btn>
      <v-btn
      color="secondary"
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
import { cloneDeep } from 'lodash/fp';
import InputFile from '~/common/Input/file.vue';
import Panel from './base';
// eslint-disable-next-line
import { validatorRequired } from '~/utils/validators.js';

export default {
  name: 'edition-panel-product',
  mixins: [Panel],
  components: { InputFile },
  data() {
    return {
      rules: {
        name: [validatorRequired()],
        vin: [validatorRequired()],
        imgUrl: [validatorRequired()],
        features: [validatorRequired()],
        price: [validatorRequired()],
        amount: [validatorRequired()],
        charachteristics: [validatorRequired()],
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
    const model = this.model;
    const refs = model.refs || {};
    refs.brand = refs.brand ? refs.brand[0] : null;
    refs.category = refs.category ? refs.category[0] : null;
    model.refs = refs;
    model.currency = model.currency || 'RUB';
    if (!model.footer) {
      Vue.set(model, 'footer', {});
    }
    if (!model.charachteristics) {
      Vue.set(model, 'charachteristics', []);
    }
    if (!model.features) {
      Vue.set(model, 'features', []);
    }
  },
  methods: {
    featuresItemRemove(index, i) {
      this.model.features[index].items.splice(i, 1);
      this.onFormControlChange();
    },
    featuresItemAdd(index) {
      this.model.features[index].items.push('');
    },
    featuresRemove(index) {
      this.model.features.splice(index, 1);
      this.onFormControlChange();
    },
    featuresAdd() {
      this.model.features.push({ title: '', items: [''] });
    },
    charachteristicsRemoveItem(index, i) {
      this.model.charachteristics[index].items.splice(i, 1);
      this.onFormControlChange();
    },
    charachteristicsAddItem(index) {
      this.model.charachteristics[index].items.push({ key: '', val: '' });
    },
    charachteristicsRemove(index) {
      this.model.charachteristics.splice(index, 1);
      this.onFormControlChange();
    },
    charachteristicsAdd() {
      this.model.charachteristics.push({
        title: '',
        items: [{ key: '', val: '' }],
      });
    },
    getProperModel() {
      const model = cloneDeep(this.model);
      const refs = model.refs;
      Object.keys(refs)
        .forEach(key => refs[key] = refs[key] ? [refs[key]] : []);

      return model;
    },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.features {
  &__item {
    &-header {
      display: flex;
      align-items: center;
    }

    &-list {
      display: flex;
      align-items: flex-end;
    }
  }
}

.charachteristics {
  &__item {
    &-header {
      display: flex;
      align-items: center;
    }
  }
}
}
</style>
