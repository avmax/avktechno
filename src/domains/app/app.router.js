import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const routes = {
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./PageAuth'),
    },
    {
      path: '/',
      name: 'categories',
      component: () => import('./PageCategories'),
    },
  ],
};


const router = new Router(routes);

export default router;
