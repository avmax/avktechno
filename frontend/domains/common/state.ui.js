const NOTIFICATION_OPEN = 'открыть нотификейшн';
const NOTIFICATION_CLOSE = 'закрыть нотификейшн';
const NOTIFICATION_LAST_CLOSE = 'закрыть последний нотификейшн';

const state = () => ({
  notification: [],
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
};

const module = { state, mutations };

export {
  module,

  NOTIFICATION_OPEN,
  NOTIFICATION_CLOSE,
  NOTIFICATION_LAST_CLOSE,
};
