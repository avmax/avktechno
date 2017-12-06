<template>
<div class="shop-entities-edition-panel">
  <h3>Редактировать сущность</h3>

  <v-form
  v-if="controls"
  v-model="valid">
    <v-layout column>

      <template v-for="(val, key) in controls">
        <v-text-field
        v-model="val.value"
        :label="val.label"
        :multi-line="val.control === 'textfield'"
        :key="key"
        :rules="val.required ? rules.text.required : null"/>
      </template>

      <v-btn
      color="primary"
      @click="save"
      :disabled="!valid">
        Сохранить изменения
      </v-btn>
      <v-btn
      color="primary"
      @click="cancel">
        Прекратить изменения
      </v-btn>

    </v-layout>
  </v-form>
</div>
</template>



<script>
import { SAVE_ENTITY_EDITS, CANCEL_ENTITY_EDITION } from '~/domains/shop/shop.state';

export default {
  name: 'shop-entities-edition-panel',
  data() {
    return {
      controls: null,
      valid: false,
      rules: {
        text: {
          required: [
            v => !!v || 'Заполни поле, еблан!',
          ],
        },
      },
    };
  },
  beforeMount() {
    this.controls = JSON.parse(
      JSON.stringify(
        this.$store.state.shop.entityBeingEdited,
      ),
    );
  },
  methods: {
    save() {
      const entityData = { };
      const dispatch = this.$store.dispatch;

      Object.keys(this.controls).forEach((key) => {
        entityData[key] = this.controls[key].value;
      });

      dispatch(`shop/${SAVE_ENTITY_EDITS}`, entityData)
        .catch(err => console.log('panel bad, err: ', err));
    },
    cancel() {
      const commit = this.$store.commit;
      commit(`shop/${CANCEL_ENTITY_EDITION}`);
    },
  },
};
</script>



<style>
#avmax {

}
</style>
