/* eslint-disable */
import axios from 'axios';
import APP_CONFIG from '~/config';

class Categories {
  get() { return axios.get(`${APP_CONFIG.baseURL}/categories`); }
  post(category) { return axios.post(`${APP_CONFIG.baseURL}/admin/categories`, category); }
  put(category) { return axios.put(`${APP_CONFIG.baseURL}/admin/categories`, category); }
  delete(categoryId) { return axios.delete(`${APP_CONFIG.baseURL}/admin/categories`, { data: { id: categoryId } }); }
}

class Api {
  constructor() {
    this.category = new Categories();
  };
};

const api = new Api();
export default api;
