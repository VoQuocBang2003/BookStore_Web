import { reactive } from 'vue';

export const eventBus = reactive({
  cartCount: JSON.parse(localStorage.getItem('cart'))?.length || 0,
  user: JSON.parse(localStorage.getItem('user')) || null, // Khởi tạo từ localStorage

  updateCartCount(count) {
    this.cartCount = count;
  },

  setUser(user) {
    this.user = user;
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },

  initializeUser() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    this.user = storedUser ? storedUser : null; // Đồng bộ từ localStorage
  },
});
