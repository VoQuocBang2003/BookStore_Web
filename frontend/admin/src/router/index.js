import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ProductManagement from '@/views/ProductManagement.vue';
import UserManagement from '@/views/UserManagement.vue';
import OrderManagement from '@/views/OrderManagement.vue';
import CategoryManagement from '@/views/CategoryManagement.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/', name: 'Home', component: HomeView },
  { path: '/products', name: 'Products', component: ProductManagement },
  { path: '/users', name: 'Users', component: UserManagement },
  { path: '/orders', name: 'Orders', component: OrderManagement },
  { path: '/categories', name: 'Categories', component: CategoryManagement },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;