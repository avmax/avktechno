import axios from 'axios';
// eslint-disable-next-line
import APP_CONFIG from '~/config';

function signIn(login, password) {
  return axios.post(`${APP_CONFIG.baseURL}/sign-in`, {
    login: login,
    password: password,
  });
}

// eslint-disable-next-line
export { signIn };
