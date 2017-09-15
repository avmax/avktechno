const SIGN_IN = 'вход в учетку';


const userState = {
  state: {
    isLoggedIn: false,
    isAdmin: false,
  },
  mutations: {
    [SIGN_IN](state, isAdmin) {
      state.isLoggedIn = true;
      state.isAdmin = isAdmin;
    },
  },
};


export { SIGN_IN };
export default userState;
