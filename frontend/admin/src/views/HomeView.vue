<template>
  <div>
    <a-row gutter={16}>
      <a-col :span="6">
        <a-card class="dashboard-card">
          <a-icon type="shopping" class="dashboard-icon" />
          <div class="card-content">
            <h3>Sản phẩm</h3>
            <p>{{ productCount }}</p>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="dashboard-card">
          <a-icon type="user" class="dashboard-icon" />
          <div class="card-content">
            <h3>Người dùng</h3>
            <p>{{ userCount }}</p>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="dashboard-card">
          <a-icon type="shopping-cart" class="dashboard-icon" />
          <div class="card-content">
            <h3>Đơn hàng</h3>
            <p>{{ orderCount }}</p>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="dashboard-card">
          <a-icon type="appstore" class="dashboard-icon" />
          <div class="card-content">
            <h3>Danh mục</h3>
            <p>{{ categoryCount }}</p>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getAllBooks } from '@/apis/booksApi';
import { getAllUsers } from '@/apis/userApi';
import { getAllOrders } from '@/apis/ordersApi';
import { getAllCategories } from '@/apis/categoriesApi';

export default {
  name: 'HomeView',
  data() {
    return {
      productCount: 0,
      userCount: 0,
      orderCount: 0,
      categoryCount: 0,
    };
  },
  async created() {
    await this.fetchCounts();
  },
  methods: {
    async fetchCounts() {
      try {
        const products = await getAllBooks();
        this.productCount = products.length;

        const users = await getAllUsers();
        this.userCount = users.length;

        const orders = await getAllOrders();
        this.orderCount = orders.length;

        const categories = await getAllCategories();
        this.categoryCount = categories.length;
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard-card {
  margin-top: 15px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.dashboard-icon {
  font-size: 48px;
  color: #1890ff;
  margin-bottom: 10px;
}

.card-content h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.card-content p {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
}
</style>
