<template>
  <header>
    <a-layout-header style="background: #fff; padding: 0">
      <div class="header-content">
        <router-link to="/">
          <img
            style="width: 160px; objectFit: contain; margin-right: 20px;"
            src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
            alt="Logo"
            class="logo"
          />
        </router-link>
        <nav style="display: flex; align-items: center;">
          <router-link to="/" style="margin-right: 20px; font-weight: bold;">Trang chủ</router-link>
          <router-link to="/products" style="font-weight: bold;">Sản phẩm</router-link>
        </nav>
        <div class="user-info">
          <span>Xin chào, {{ user ? user.username : 'User' }}</span>
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              <span>▼</span>
            </a>
            <template v-slot:overlay>
              <a-menu>
                <a-menu-item @click="goToFavorites">Danh sách yêu thích</a-menu-item>
                <a-menu-item @click="goToOrderManagement">Quản lý đơn hàng</a-menu-item>
                <a-menu-item @click="handleLogout">Logout</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div class="cart-info" style="margin-left: 20px;">
          <span @click="goToCart">Giỏ hàng: {{ cartCount }}</span>
        </div>
      </div>
    </a-layout-header>
  </header>
</template>

<script>
import { Layout, Dropdown, Menu } from 'ant-design-vue';
import { eventBus } from '../eventBus';

export default {
  name: 'AppHeader',
  components: {
    'a-layout-header': Layout.Header,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
    };
  },
  computed: {
    currentUser() {
      return eventBus.user;
    },
    cartCount() {
      return eventBus.cartCount;
    },
  },
  methods: {
    goToProfile() {
      console.log('Navigating to profile...');
    },
    goToFavorites() {
      console.log('Navigating to favorites...');
      this.$router.push('/favorites');
    },
    goToOrderManagement() {
      console.log('Navigating to order management...');
      this.$router.push('/orders');
    },
    handleLogout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    goToCart() {
      console.log('Navigating to cart...');
      this.$router.push('/cart');
    },
  },
};
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.logo {
  height: 40px;
}

.user-info {
  margin-left: auto;
  font-weight: bold;
  color: #333;
}
</style> 