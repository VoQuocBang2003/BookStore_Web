<template>
  <div class="book-details-container">
    <div class="book-card">
      <div class="book-image-section">
        <img :src="book.image" alt="Book cover" class="book-image" />
      </div>
      <div class="book-info-section">
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-author"><strong>Tác giả:</strong> {{ book.author }}</p>
        <p class="book-publisher"><strong>Nhà xuất bản:</strong> {{ book.publisher }}</p>
        <p class="book-year"><strong>Năm xuất bản:</strong> {{ book.publicationYear }}</p>
        <p class="book-genre"><strong>Thể loại:</strong> {{ book.genre }}</p>
        <p class="book-language"><strong>Ngôn ngữ:</strong> {{ book.language }}</p>
        <p class="book-price"><strong>Giá:</strong> {{ formatPrice(book.price) }} đ</p>
        <button class="add-to-cart" @click="addToCart">Thêm vào giỏ hàng</button>
        <button class="add-to-wishlist" @click="addToWishlist">Thêm vào danh sách yêu thích</button>
      </div>
    </div>
    <div class="book-description-section">
      <h3>Mô tả</h3>
      <p>{{ book.description }}</p>
    </div>
    <div class="related-products-section">
      <h3>Sản phẩm liên quan</h3>
      <div class="related-products-list">
        <div
          v-for="relatedBook in relatedBooks"
          :key="relatedBook.id"
          class="related-book-card"
          @click="viewBookDetails(relatedBook.id)"
        >
          <img :src="relatedBook.image" alt="Book cover" class="related-book-image" />
          <h4>{{ relatedBook.title }}</h4>
          <p class="related-book-price">{{ formatPrice(relatedBook.price) }} đ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import { getBookById, getAllBooks } from '../apis/booksApi';
import { addToWishlist } from '../apis/wishlistsApi';
import { eventBus } from '../eventBus';

export default {
  name: 'BookDetails',
  data() {
    return {
      book: {},
      relatedBooks: [],
    };
  },
  async created() {
    const bookId = this.$route.params.id;
    this.book = await getBookById(bookId);
    const allBooks = await getAllBooks();
    this.relatedBooks = this.getRandomBooks(allBooks, 5);
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat('vi-VN').format(value);
    },
    getRandomBooks(books, count) {
      const shuffled = books.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    viewBookDetails(bookId) {
      this.$router.push({ name: 'BookDetails', params: { id: bookId } });
    },
    addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === this.book.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...this.book, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      eventBus.updateCartCount(cart.length);
    },
    async addToWishlist() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          alert('Vui lòng đăng nhập để thêm vào danh sách yêu thích.');
          return;
        }
        const response = await addToWishlist({ bookId: this.book.id, userId: user.id });
        if (response.success) {
          alert('Đã thêm vào danh sách yêu thích!');
        } else if (response.message === 'Item already in wishlist') {
          alert('Sản phẩm đã có trong danh sách yêu thích.');
        } else {
          alert('Đã thêm vào danh sách yêu thích!');
        }
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        alert('Có lỗi xảy ra khi thêm vào danh sách yêu thích.');
      }
    },
  },
};
</script> -->

<script>
import { getBookById, getAllBooks } from '../apis/booksApi';
import { addToWishlist } from '../apis/wishlistsApi';
import { eventBus } from '../eventBus';

export default {
  name: 'BookDetails',
  data() {
    return {
      book: {},
      relatedBooks: [],
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true, // Thực thi ngay khi component được mount
      handler(newId) {
        this.loadBookData(newId);
      },
    },
  },
  methods: {
    async loadBookData(bookId) {
      try {
        // Lấy thông tin sách hiện tại
        this.book = await getBookById(bookId);
        const allBooks = await getAllBooks();
        // Cập nhật danh sách sách liên quan
        this.relatedBooks = this.getRandomBooks(allBooks, 5);
      } catch (error) {
        console.error('Error loading book data:', error);
      }
    },
    formatPrice(value) {
      return new Intl.NumberFormat('vi-VN').format(value);
    },
    getRandomBooks(books, count) {
      const shuffled = books.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    viewBookDetails(bookId) {
      this.$router.push({ name: 'BookDetails', params: { id: bookId } });
    },
    addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === this.book.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...this.book, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      eventBus.updateCartCount(cart.length);
    },
    async addToWishlist() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          alert('Vui lòng đăng nhập để thêm vào danh sách yêu thích.');
          return;
        }
        const response = await addToWishlist({ bookId: this.book.id, userId: user.id });
        if (response.success) {
          alert('Đã thêm vào danh sách yêu thích!');
        } else if (response.message === 'Item already in wishlist') {
          alert('Sản phẩm đã có trong danh sách yêu thích.');
        } else {
          alert('Đã thêm vào danh sách yêu thích!');
        }
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        alert('Có lỗi xảy ra khi thêm vào danh sách yêu thích.');
      }
    },
  },
  created() {
    this.loadBookData(this.$route.params.id);
  },
};
</script>


<style scoped>
.book-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f0f4f8;
}

.book-card {
  display: flex;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  margin-bottom: 20px;
}

.book-image-section {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9ecef;
}

.book-image {
  max-width: 90%;
  max-height: 400px;
  border-radius: 8px;
  object-fit: cover;
}

.book-info-section {
  flex: 2;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-left: 1px solid #ddd;
}

.book-title {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #2c3e50;
  font-weight: bold;
}

.book-info-section p {
  margin: 8px 0;
  color: #555;
  line-height: 1.6;
}

.book-price {
  font-size: 1.5em;
  color: #e74c3c;
  font-weight: bold;
  margin-top: 10px;
}

.add-to-cart, .add-to-wishlist {
  margin-top: 20px;
  padding: 12px 25px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.2s;
}

.add-to-cart:hover, .add-to-wishlist:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.add-to-cart:active, .add-to-wishlist:active {
  transform: translateY(0);
}

.book-description-section {
  max-width: 900px;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-top: 20px;
}

.book-description-section h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #2c3e50;
}

.book-description-section p {
  color: #555;
  line-height: 1.6;
}

.related-products-section {
  max-width: 900px;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-top: 20px;
}

.related-products-section h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #2c3e50;
}

.related-products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.related-book-card {
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.related-book-card:hover {
  transform: translateY(-5px);
}

.related-book-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.related-book-price {
  color: #e74c3c;
  font-weight: bold;
}
</style>