<template>
  <div class="wishlist-container">
    <h2 class="wishlist-title">Danh sách yêu thích</h2>
    
    <table class="wishlist-table">
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Tên sách</th>
          <th>Tác giả</th>
          <th>Giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in wishlist" :key="item.id">
          <td><img :src="item.image" alt="Book cover" class="wishlist-image" /></td>
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ formatPrice(item.price) }} đ</td>
          <td>
            <button class="remove-button" @click="handleRemoveFromWishlist(item.user_id, item.book_id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getWishlistByUserId, removeFromWishlist } from '../apis/wishlistsApi';

export default {
  name: 'UserWishlist',
  data() {
    return {
      wishlist: [],
    };
  },
  async created() {
    await this.fetchWishlist();
  },
  methods: {
    async fetchWishlist() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
          const response = await getWishlistByUserId(user.id);
          console.log(response)
          if (response.success) {
            this.wishlist = response.data;
          } else {
            this.wishlist = [];
            console.warn(response.message || 'No wishlist items found for this user');
          }
        } else {
          alert('Vui lòng đăng nhập để xem danh sách yêu thích.');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        console.error('Có lỗi xảy ra khi tải danh sách yêu thích.');
      }
    },

    async handleRemoveFromWishlist(userId, bookId) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          alert('Vui lòng đăng nhập để thực hiện thao tác này.');
          this.$router.push('/login');
          return;
        }
        await removeFromWishlist({ userId, bookId });
        alert(`Đã xóa khỏi danh sách yêu thích!`);
        await this.fetchWishlist(); // Reload data after removal
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        alert('Có lỗi xảy ra khi xóa khỏi danh sách yêu thích.');
      }
    },
    formatPrice(value) {
      return new Intl.NumberFormat('vi-VN').format(value);
    },
  },
};
</script>

<style scoped>
.wishlist-container {
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  max-width: 800px;
  margin: 0 auto;
}

.wishlist-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.no-items-message {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-top: 20px;
}

.wishlist-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.wishlist-table th, .wishlist-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.wishlist-table th {
  background-color: #f1f1f1;
  font-weight: bold;
}

.wishlist-image {
  width: 60px;
  height: auto;
  border-radius: 4px;
}

.remove-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #e60000;
}
</style> 