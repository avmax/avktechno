<template>
<v-container fill-height class="page">
  <v-layout column style="min-height: calc(100vh - 200px);">
    <div class="page__header">
      <h1 class="text-xs-left text-md-center">Корзина</h1>
    </div>

    <v-layout v-if="!products || !products.length" align-center justify-center>
      <h2>Корзина пуста</h2>
    </v-layout>

    <template v-else>
      <v-form
        ref="form"
        v-model="form.isValid"
        lazy-validation
        class="page__form my-5"
      >
        <div class="subheader pa-0">Пожалуйста, заполните и отправьте данную форму, и мы свяжемся с Вами в течение 5 минут!</div>
        <v-text-field
          label="Ваше имя"
          v-model="form.value.name"
          :rules="form.rules.name"
          autofocus
          validate-on-blur
          required
        />
        <v-text-field
          label="Ваш телефон"
          mask="+7 (###) ###-##-##"
          v-model="form.value.phone"
          :rules="form.rules.phone"
          validate-on-blur
          required
        />
        <v-text-field
          label="Ваша почта"
          v-model="form.value.mail"
          :rules="form.rules.mail"
          validate-on-blur
          required
        />
        <v-btn
          class="ml-0 mt-3"
          :disabled="!form.isValid"
          @click="submit"
          primary
        >
          Отправить
        </v-btn>
      </v-form>

      <h2 class="text-xs-center mb-4">Выбранные товары. Общая сумма: {{totalPrice}} ₽</h2>

      <!-- items -->
      <product-collection>
        <v-flex
          v-for="p in products"
          :key="p.id"
          xs12 sm6 lg4
        >
          <product-item
            :data="p"
          />
        </v-flex>
      </product-collection>
    </template>
  </v-layout>
</v-container>
</template>

<script>
import { ApiCart } from '~/barrel/api';
import { NOTIFICATION_TYPES } from '~/barrel/types';
import {
  NOTIFICATION_OPEN,
  NOTIFICATION_LAST_CLOSE,
} from '~/barrel/state';
import ProductCollection from '~/domains/shop/Product/collection.vue';
import ProductItem from '~/domains/shop/Product/item.vue';

export default {
  components: {
    ProductCollection,
    ProductItem,
  },
  layout: 'base',
  data() {
    return {
      form: {
        isValid: true,
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
            v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email должен быть валидным',
          ],
        },
      },
    };
  },
  computed: {
    products() {
      const { state, getters } = this.$store;
      const { cart } = state;
      const IDs = Object.keys(cart.items);
      const products = IDs.map(id => ({ ...getters.product(id), count: cart.items[id] }));
      return products;
    },
    totalPrice() {
      let sum = 0;
      this.products.forEach(p => sum += p.price * p.count);
      return sum;
    },
  },
  methods: {
    async submit() {
      const { form } = this.$refs;
      const { commit } = this.$store;

      if (form.validate()) {
        const data = { ...this.form.value, items: this.products };
        try {
          await ApiCart.askForCall(data);
          commit(NOTIFICATION_OPEN, {
            message: 'Спасибо! Вот-вот свяжемся с Вами!',
            type: NOTIFICATION_TYPES.success,
          });
          setTimeout(() => commit(NOTIFICATION_LAST_CLOSE), 3000);
          form.reset();
        } catch (err) {
          commit(NOTIFICATION_OPEN, {
            message: 'Просим прощения, у нас произошла ошибка!',
            type: NOTIFICATION_TYPES.error,
          });
          setTimeout(() => commit(NOTIFICATION_LAST_CLOSE), 3000);
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
