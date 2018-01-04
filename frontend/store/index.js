import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { module as user } from '~/domains/user/state.user';
import { module as shop } from '~/domains/shop/state.shop';
import { module as notification } from '~/domains/common/state.notification';

const store = new Vuex.Store({
  modules: { user, shop, notification },
  plugins: [createLogger()],
});

export default () => store;
