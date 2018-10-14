<template>
<v-app id="avmax">
  <div class="page page_auth">
    <div class="page__content">
      <v-layout row justify-center>
        <v-divider></v-divider>
        <v-flex xs12 md4 lg3>
          <h1 class="headline mb-1 text-xs-center">Авторизация</h1>
          <v-form v-model="valid">
            <v-layout column>

              <v-text-field
              label="Логин"
              v-model="form.value.login"
              :rules="form.rules.login"
              :counter="20"
              color="secondary"
              required/>

              <v-text-field
              label="Пароль"
              v-model="form.value.password"
              :rules="form.rules.password"
              type="password"
              class="mb-3"
              color="secondary"
              required/>

              <v-btn
              @click="submit"
              :disabled="!valid"
              class="mt-0 mr-0 mb-0 ml-0"
              color="primary"
              large>
                Войти
              </v-btn>

            </v-layout>
          </v-form>

        </v-flex>
        <v-divider></v-divider>
      </v-layout>
    </div>

  </div>
</v-app>
</template>



<script>
import {
  NOTIFICATION_TYPES,
} from '~/barrel/types';
import {
  USER_SIGN_IN,
  NOTIFICATION_OPEN,
} from '~/barrel/state';
import { apiUser } from '~/barrel/api';

export default {
  name: 'page-auth',
  layout: 'base',
  data() {
    return {
      valid: false,
      form: {
        value: {
          login: '',
          password: '',
        },
        rules: {
          login: [
            v => !!v || 'Login is required',
            v => v.length <= 20 || 'Login must be less than 20 characters',
          ],
          password: [
            v => !!v || 'Password is required',
            v => v.length >= 8 || 'Password must be more than 8 characters',
          ],
        },
      },
    };
  },
  methods: {
    async submit() {
      const { commit } = this.$store;

      try {
        const data = await apiUser.signIn(this.form.value);
        commit(USER_SIGN_IN, data);
        this.$router.push('/');
      } catch (err) {
        console.log('err', err);
        commit(NOTIFICATION_OPEN, {
          type: NOTIFICATION_TYPES.error,
          message: 'При авторизации произошла ошибка!',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#avmax {
.page_auth {
  display: flex;
  justify-content: center;
  align-items: center;

  .page {
    &__content {
      width: 100%;
    }
  }
}
}
</style>
