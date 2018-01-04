const USER_SIGN_IN = 'вход в учетку';


const state = () => ({
  isLoggedIn: true,
  isAdmin: true,
});

const mutations = {
  [USER_SIGN_IN](state, isAdmin) {
    state.isLoggedIn = true;
    state.isAdmin = isAdmin;
  },
};


export const module = { state, mutations };
export { USER_SIGN_IN };
