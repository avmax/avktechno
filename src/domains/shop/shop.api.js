import axios from 'axios';
import APP_CONFIG from '@/config';

function getCategories() {
  return axios.get(`${APP_CONFIG.baseURL}/categories`);
}

function addCategory(category) {
  return axios.post(`${APP_CONFIG.baseURL}/admin/categories/add`, category);
}

function removeCategory(categoryId) {
  return axios.delete(`${APP_CONFIG.baseURL}/admin/categories/remove`, { data: { id: categoryId } });
}

export { getCategories, addCategory, removeCategory };
