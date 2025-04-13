import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import BookDetails from '@/components/BookDetails.vue';
import ShoppingCart from '@/components/Cart.vue';
import Wishlist from '@/components/Wishlist.vue';
import BooksView from '@/views/BooksView.vue';
import OrderView from '@/components/OrderView.vue'; 

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/book/:id', name: 'BookDetails', component: BookDetails },
  { path: '/cart', name: 'Cart', component: ShoppingCart },
  { path: '/favorites', name: 'Wishlist', component: Wishlist },
  { path: '/products', name: 'Books', component: BooksView },
  { path: '/orders', name: 'Orders', component: OrderView },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
