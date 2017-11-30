<template>
<div class="page page_auth">

  <h1>СТРАНИЦА АВТОРИЗАЦИИ</h1>

  <div class="page__content">
    <v-layout row justify-center>
      <v-divider></v-divider>
      <v-flex xs4>

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
            required/>

            <v-btn
            color="primary"
            @click="submit"
            :disabled="!valid">
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
          this.$store.commit(`user/${SIGN_IN}`, data);
          this.$router.push({ name: 'categories' });
        })
        .catch(err => console.log(err.response.data));
    },
  },
};
</script>



<style>
#avmax {

}
</style>
