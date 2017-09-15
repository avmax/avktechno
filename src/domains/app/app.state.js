import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import userState from '@/domains/user/user.state';
import shopState from '@/domains/shop/shop.state';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  strict: debug,
  modules: {
    user: userState,
    shop: shopState,
  },
  plugins: debug ? [createLogger()] : [],
});


export default store;
