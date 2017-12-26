import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { module as user } from '~/domains/user/user.state';
import { module as shop } from '~/domains/shop/shop.state';

const store = new Vuex.Store({
  modules: { user, shop },
  plugins: [createLogger()],
});

export default () => store;
