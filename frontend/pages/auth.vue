<template>
<div class="page page_auth">
  <div class="page__content">
    <v-layout row justify-center>
      <v-divider></v-divider>
      <v-flex xs12 md4 lg3>
        <h1 class="headline mb-3">Авторизация</h1>
        <v-form v-model="valid">
          <v-layout column>

            <v-text-field
            label="Логин"
            v-model="form.value.login"
            :rules="form.rules.login"
            :counter="20"
            required/>

            <v-text-field
            label="Пароль"
            v-model="form.value.password"
            :rules="form.rules.password"
            type="password"
            class="mb-3"
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
</template>



<script>
import { SIGN_IN } from '~/domains/user/user.state';
import { signIn } from '~/domains/user/user.api';

export default {
  name: 'page-auth',
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
    submit() {
      signIn(this.form.value)
        .then(({ data }) => {
          this.$store.commit(SIGN_IN, data);
          this.$router.push({ name: 'categories' });
        })
        .catch(err => console.log(err.response.data));
    },
  },
};
</script>


<style lang="scss">
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
