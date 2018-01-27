import { module as shop } from '~/domains/shop/state';
import { module as edition } from '~/domains/edition/state';
import { module as filter } from '~/domains/filter/state';
import { module as user } from '~/domains/user/state.user';
import { module as ui } from '~/domains/common/state.ui';
import { module as cart } from '~/domains/cart/state.cart';

import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';


const store = () => {
  const cfg = {
    modules: { shop, edition, ui, user, cart, filter },
    plugins: [],
  };

  if (!process.env.isProd) {
    cfg.plugins.push(createLogger());
  }

  return new Vuex.Store(cfg);
};
export default () => store();
