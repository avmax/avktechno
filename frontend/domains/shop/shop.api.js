import axios from 'axios';
// eslint-disable-next-line
import APP_CONFIG from '~/config';

function getCategories() {
  return axios.get(`${APP_CONFIG.baseURL}/categories`);
}

function postCategory(category) {
  return axios.post(`${APP_CONFIG.baseURL}/admin/categories/post`, category);
}

function putCategory(category) {
  return axios.put(`${APP_CONFIG.baseURL}/admin/categories/put`, category);
}

function deleteCategory(categoryId) {
  return axios.delete(`${APP_CONFIG.baseURL}/admin/categories/delete`, { data: { id: categoryId } });
}

export { getCategories, postCategory, putCategory, deleteCategory };
