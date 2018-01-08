/* eslint-disable */
import axios from 'axios';
import APP_CONFIG from '~/config';

axios.interceptors.request.use((config) => {
  config.url = APP_CONFIG.baseURL + config.url;
  return config;
});

axios.interceptors.response.use(
  response => response,
  err => Promise.reject(err.response && err.response.data),
);

class Products {
  get() { return axios.get('/products'); }
  post(product) { return axios.post('/admin/products', product); }
  put(product) { return axios.put('/admin/products', product); }
  delete(productID) { return axios.delete('/admin/products', { data: { id: productID } }); }
}

class Categories {
  get() { return axios.get('/categories'); }
  post(category) { return axios.post('/admin/categories', category); }
  put(category) { return axios.put('/admin/categories', category); }
  delete(categoryID) { return axios.delete('/admin/categories', { data: { id: categoryID } }); }
}

class Brands {
  get() { return axios.get('/brands'); }
  post(brand) { return axios.post('/admin/brands', brand); }
  put(brand) { return axios.put('/admin/brands', brand); }
  delete(brandID) { return axios.delete('/admin/brands', { data: { id: brandID } }); }
}

class Api {
  constructor() {
    this.category = new Categories();
    this.brand = new Brands();
    this.product = new Products();
  };
};

const ApiShop = new Api();
export { ApiShop };
