// Vue
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import Router from 'vue-router';

// app
import App from './domains/app/App';
import router from './domains/app/app.router';
import store from './domains/app/app.state';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(Router);
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#avktechno',
  template: '<App/>',
  components: { App },
  router,
  store,
});
