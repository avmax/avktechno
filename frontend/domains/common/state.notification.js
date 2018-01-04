const NOTIFICATION_OPEN = 'открыть нотификейшн';
const NOTIFICATION_CLOSE = 'закрыть нотификейшн';
const NOTIFICATION_LAST_CLOSE = 'закрыть последний нотификейшн';

const NOTIFICATION_TYPES = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  error: 'error',
};

const state = () => ({
  items: [],
});

const mutations = {
  [NOTIFICATION_OPEN](state, payload) {
    state.items.push(payload);
  },
  [NOTIFICATION_CLOSE](state, payload) {
    state.items.splice(payload, 1);
  },
  [NOTIFICATION_LAST_CLOSE](state) {
    state.items.pop();
  },
};

const module = {
  state,
  mutations,
};

export {
  module,
  NOTIFICATION_TYPES,
  NOTIFICATION_OPEN,
  NOTIFICATION_CLOSE,
  NOTIFICATION_LAST_CLOSE,
};
