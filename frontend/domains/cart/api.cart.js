/* eslint-disable */
import axios from 'axios';
class Api {
  askForCall(data) {
    return axios.post('/cart', data);
  }
}

const ApiCart = new Api();
export { ApiCart };
