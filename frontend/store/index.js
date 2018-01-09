import { module as user } from '~/domains/user/state.user';
import { module as shop } from '~/domains/shop/state.shop';
import { module as edition } from '~/domains/edition/state.edition';
import { module as ui } from '~/domains/common/state.ui';
import { module as cart } from '~/domains/cart/state.cart';

import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';


const store = () => new Vuex.Store({
  modules: { shop, edition, ui, user, cart },
  plugins: [createLogger()],
});

export default () => store();
