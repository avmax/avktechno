import {
  ENTITY_ALL_LOAD,
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,
} from '~/domains/shop/store';

import {
  EDITION_START_CREATION,
  EDITION_START_EDITION,
  EDITION_REMOVE,
  EDITION_SAVE,
  EDITION_STOP,
} from '~/domains/edition/store';

import {
  FILTER_VISIBILITY_TOGGLE,
  FILTER_CHOSEN_SET,
  FILTER_CHOSEN_ADD,
  FILTER_CHOSEN_REMOVE,
  FILTER_VISIBILITY_SET,
  FILTER_DROP,
} from '~/domains/filter/store';

import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
} from '~/domains/user/store';

import {
  NOTIFICATION_OPEN,
  NOTIFICATION_CLOSE,
  NOTIFICATION_LAST_CLOSE,

  SPINNER_SHOW,
  SPINNER_HIDE,

  SIDEBAR_TOGGLE,
  SIDEBAR_SET,
} from '~/common/store.ui';

import {
  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
} from '~/domains/cart/store';

export {
  ENTITY_ALL_LOAD,
  ENTITY_ADD,
  ENTITY_EDIT,
  ENTITY_REMOVE,

  EDITION_START_CREATION,
  EDITION_START_EDITION,
  EDITION_REMOVE,
  EDITION_SAVE,
  EDITION_STOP,

  FILTER_VISIBILITY_TOGGLE,
  FILTER_VISIBILITY_SET,
  FILTER_CHOSEN_SET,
  FILTER_CHOSEN_ADD,
  FILTER_CHOSEN_REMOVE,
  FILTER_DROP,

  USER_SIGN_IN,
  USER_SIGN_OUT,

  NOTIFICATION_OPEN,
  NOTIFICATION_CLOSE,
  NOTIFICATION_LAST_CLOSE,

  SPINNER_SHOW,
  SPINNER_HIDE,

  SIDEBAR_TOGGLE,
  SIDEBAR_SET,

  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
};
