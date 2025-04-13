<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible width="200" class="site-layout-background">
    <a-menu
      mode="inline"
      :default-selected-keys="[selectedKey]"
      style="height: 100%; border-right: 0"
    >
      <a-menu-item key="1">
        <router-link to="/">Trang chủ</router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/products">Quản lý sản phẩm</router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/users">Quản lý người dùng</router-link>
      </a-menu-item>
      <a-menu-item key="4">
        <router-link to="/orders">Quản lý đơn hàng</router-link>
      </a-menu-item>
      <a-menu-item key="5">
        <router-link to="/categories">Quản lý danh mục</router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'AppSidebar',
  computed: {
    selectedKey() {
      const path = this.$route.path;
      if (path === '/') return '1';
      if (path === '/products') return '2';
      if (path === '/users') return '3';
      if (path === '/orders') return '4';
      if (path === '/categories') return '5';
      return '1';
    },
  },
};
</script>

<style scoped>
</style>