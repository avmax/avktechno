/* eslint-disable */
import axios from 'axios';

axios.interceptors.request.use((config) => {
  config.url = process.env.server.URL + config.url;
  return config;
});

axios.interceptors.response.use(
  response => response,
  err => Promise.reject(err && err.response && err.response.data),
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
  post(brand) {
    console.log('brand', brand);
    return axios({
      method: 'post',
      url: '/admin/brands',
      data: brand,
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
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
