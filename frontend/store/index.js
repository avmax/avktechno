import { module as shop } from '~/domains/shop/store';
import { module as edition } from '~/domains/edition/store';
import { module as filter } from '~/domains/filter/store';
import { module as user } from '~/domains/user/store';
import { module as ui } from '~/common/store.ui';
import { module as cart } from '~/domains/cart/store';

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
