const USER_SIGN_IN = 'вход в учетку';
const USER_SIGN_OUT = 'выход из учетки';


const state = () => ({
  isSignedIn: false,
  isAdmin: false,
});

const mutations = {
  [USER_SIGN_IN](state, isAdmin) {
    state.isSignedIn = true;
    state.isAdmin = isAdmin;
  },
  [USER_SIGN_OUT](state) {
    state.isSignedIn = false;
    state.isAdmin = false;
  },
};


const module = { state, mutations };
export {
  module,

  USER_SIGN_IN,
  USER_SIGN_OUT,
};
