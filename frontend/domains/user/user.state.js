const SIGN_IN = 'вход в учетку';


export const state = () => ({
  isLoggedIn: false,
  isAdmin: false,
});

export const mutations = {
  [SIGN_IN](state, isAdmin) {
    state.isLoggedIn = true;
    state.isAdmin = isAdmin;
  },
};


export { SIGN_IN };
