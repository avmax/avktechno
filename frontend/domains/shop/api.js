/* eslint-disable */
import axios from 'axios';
import {
  ENTITY_TYPES,
} from '~/barrel/types';

axios.interceptors.request.use((config) => {
  config.url = process.env.server.URL + config.url;
  return config;
});

axios.interceptors.response.use(
  response => response,
  err => Promise.reject(err && err.response && err.response.data),
);

class Product {
  get() { return axios.get('/products'); }
  post(product) {
    return axios({
      method: 'post',
      url: '/admin/products',
      data: product,
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
  put(product) {
    return axios({
      method: 'put',
      url: '/admin/products',
      data: product,
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
  delete(productID) { return axios.delete('/admin/products', { data: { id: productID } }); }
}

class Category {
  get() { return axios.get('/categories'); }
  post(category) {
    return axios({
      method: 'post',
      url: '/admin/categories',
      data: category,
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
  put(category) {
    return axios({
      method: 'put',
      url: '/admin/categories',
      data: category,
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
  delete(categoryID) { return axios.delete('/admin/categories', { data: { id: categoryID } }); }
}

class Brand {
  get() { return axios.get('/brands'); }
  post(brand) {
    return axios({
      method: 'post',
      url: '/admin/brands',
      data: brand,
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
  put(brand) {
    return axios({
      method: 'put',
      url: '/admin/brands',
      data: brand,
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
  delete(brandID) { return axios.delete('/admin/brands', { data: { id: brandID } }); }
}

class Api {
  constructor() {
    this[ENTITY_TYPES.category] = new Category();
    this[ENTITY_TYPES.brand] = new Brand();
    this[ENTITY_TYPES.product] = new Product();
  };
};

const apiShop = new Api();
export { apiShop };
