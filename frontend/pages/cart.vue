<template>
  <v-layout class="page" column>
    <div class="page__header">
      <h1 class="text-xs-left text-md-center">Корзина</h1>
    </div>

    <v-layout v-if="!data || !data.length" align-center justify-center>
      <h2>Корзина пуста</h2>
    </v-layout>

    <template v-else>
      <v-form class="page__form my-5" ref="form" v-model="form.isValid">
        <div class="subheader pa-0">Пожалуйста, заполните и отправьте данную форму, и мы свяжемся с Вами в течение 5 минут!</div>
        <v-text-field label="Ваше имя" v-model="form.value.name" :rules="form.rules.name" autofocus required/>
        <v-text-field label="Ваш телефон" mask="+7 (###) ###-##-##" v-model="form.value.phone" :rules="form.rules.phone" required/>
        <v-text-field label="Ваша почта" v-model="form.value.mail" :rules="form.rules.mail" required/>
        <v-btn class="mt-3" :disabled="!form.isValid" @click="submit">Отправить</v-btn>
      </v-form>

      <h2 class="text-xs-center mb-3">Выбранные товары</h2>
      <shop-entity-exposition
      :type="type"
      :subtype="subtype"
      :data="data"
      :invert="{ false: 'брендам', true: 'категориям' }"
      @invert="invert"/>
    </template>
  </v-layout>
</template>

<script>
import ShopEntityExposition from '~/domains/shop/ShopEntityExposition.vue';
import { ENTITY_TYPES, NOTIFICATION_TYPES } from '~/domains/barrel.types';
import { NOTIFICATION_OPEN, NOTIFICATION_LAST_CLOSE } from '~/domains/barrel.state';
import { ApiCart } from '~/domains/barrel.api';

export default {
  components: {
    ShopEntityExposition,
  },
  data() {
    return {
      type: ENTITY_TYPES.category,
      subtype: ENTITY_TYPES.product,
      form: {
        isValid: false,
        value: {
          name: null,
          phone: null,
          mail: null,
        },
        rules: {
          name: [v => !!v || 'Это поле обязательно'],
          phone: [
            v => !!v || 'Это поле обязательно',
            // v => /^$/.test(v) || 'Телефон должен быть валидным',
          ],
          mail: [
            v => !!v || 'Это поле обязательно',
            // eslint-disable-next-line
            v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email должен быть валидным'
          ],
        },
      },
    };
  },
  computed: {
    data() {
      const data = this.$store.getters.entities(this.type).map((id) => {
        const collectionModel = this.$store.getters.entity(this.type, id);
        const collection = {
          model: collectionModel,
          items: collectionModel && collectionModel.refs[this.subtype]
            .filter(id => this.$store.state.cart.items.indexOf(id) !== -1)
            .map(id => this.$store.getters.entity(this.subtype, id)),
        };

        return collection;
      });

      return data.filter(c => c.items.length);
    },
    items() {
      return this.$store.state.cart.items
        .map(id => this.$store.getters.entity(ENTITY_TYPES.product, id));
    },
  },
  methods: {
    invert() {
      this.type = this.type === ENTITY_TYPES.brand
        ? ENTITY_TYPES.category
        : ENTITY_TYPES.brand;
    },
    async submit() {
      if (this.$refs.form.validate()) {
        const data = { val: this.form.value, items: this.items };
        try {
          await ApiCart.askForCall(data);
          this.$store.commit(NOTIFICATION_OPEN, {
            message: 'Спасибо! Вот-вот свяжемся с Вами!',
            type: NOTIFICATION_TYPES.success,
          });
          setTimeout(() => this.$store.commit(NOTIFICATION_LAST_CLOSE), 3000);
          this.$refs.form.reset();
        } catch (err) {
          this.$store.commit(NOTIFICATION_OPEN, {
            message: 'Просим прощения, у нас произошла ошибка!',
            type: NOTIFICATION_TYPES.error,
          });
          setTimeout(() => this.$store.commit(NOTIFICATION_LAST_CLOSE), 3000);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
@media all and (min-width: 768px) {
.page {
  &__form {
    width: 50%;
    margin: 0 auto;
  }
}
}
}
</style>
