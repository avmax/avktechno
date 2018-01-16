const NOTIFICATION_OPEN = 'ui: открыть нотификейшн';
const NOTIFICATION_CLOSE = 'ui: закрыть нотификейшн';
const NOTIFICATION_LAST_CLOSE = 'ui: закрыть последний нотификейшн';
const SPINNER_SHOW = 'ui: показать спиннер';
const SPINNER_HIDE = 'ui: спрятать спиннер';

const state = () => ({
  notification: [],
  spinner: true,
});

const mutations = {
  [NOTIFICATION_OPEN](state, payload) {
    state.notification.push(payload);
  },
  [NOTIFICATION_CLOSE](state, payload) {
    state.notification.splice(payload, 1);
  },
  [NOTIFICATION_LAST_CLOSE](state) {
    state.notification.pop();
  },

  [SPINNER_SHOW](state) {
    state.spinner = true;
  },
  [SPINNER_HIDE](state) {
    state.spinner = false;
  },
};

const module = { state, mutations };

export {
  module,

  NOTIFICATION_OPEN,
  NOTIFICATION_CLOSE,
  NOTIFICATION_LAST_CLOSE,

  SPINNER_SHOW,
  SPINNER_HIDE,
};
