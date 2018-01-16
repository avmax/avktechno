/* eslint-disable */
import axios from 'axios';

class Api {
  signIn({ login, password }) {
    return axios.post('/sign-in', { login, password });
  }
}

const ApiUser = new Api();
export { ApiUser };
