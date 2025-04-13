<template>
  <div class="books-view-container">
    <div class="search-filters">
      <input v-model="searchQuery" placeholder="Tìm kiếm theo tên hoặc tác giả" @input="searchBooks" class="search-input" />
      <div class="select-container">
        <select v-model="selectedCategory" @change="filterBooks" class="custom-select">
          <option value="">Tất cả danh mục</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="select-container">
        <select v-model="selectedPriceRange" @change="filterBooks" class="custom-select">
          <option value="">Tất cả giá</option>
          <option value="low">Dưới 20,000 đ</option>
          <option value="medium">20,000 đ - 50,000 đ</option>
          <option value="high">Trên 50,000 đ</option>
        </select>
      </div>
      <div class="select-container">
        <select v-model="selectedInitial" @change="filterBooks" class="custom-select">
          <option value="">Tất cả chữ cái</option>
          <option v-for="letter in alphabet" :key="letter" :value="letter">
            {{ letter }}
          </option>
        </select>
      </div>
    </div>
    <div class="books-list">
      <div v-for="book in paginatedBooks" :key="book.id" class="book-card" @click="viewBookDetails(book.id)">
        <img :src="book.image || 'https://via.placeholder.com/150'" alt="Bìa sách" class="book-image" />
        <div class="book-info">
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">bởi {{ book.author }}</p>
          <p class="book-price">{{ formatPrice(book.price) }} đ</p>
        </div>
      </div>
    </div>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Trước</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Tiếp</button>
    </div>
  </div>
</template>

<script>
import { getAllBooks } from '@/apis/booksApi';
import { getAllCategories } from '@/apis/categoriesApi';

export default {
  data() {
    return {
      books: [],
      categories: [],
      searchQuery: '',
      selectedCategory: '',
      selectedPriceRange: '',
      selectedInitial: '',
      currentPage: 1,
      booksPerPage: 10,
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        const matchesSearchQuery = book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                   book.author.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory ? book.categories_id === this.selectedCategory : true;
        const matchesPriceRange = this.selectedPriceRange ? this.checkPriceRange(book.price) : true;
        const matchesInitial = this.selectedInitial ? book.title.startsWith(this.selectedInitial) : true;

        return matchesSearchQuery && matchesCategory && matchesPriceRange && matchesInitial;
      });
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      const end = start + this.booksPerPage;
      return this.filteredBooks.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.booksPerPage);
    },
  },
  methods: {
    async fetchBooks() {
      this.books = await getAllBooks();
      this.categories = await getAllCategories();
    },
    searchBooks() {
      this.currentPage = 1;
    },
    filterBooks() {
      this.currentPage = 1;
    },
    viewBookDetails(bookId) {
      this.$router.push(`/book/${bookId}`);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    checkPriceRange(price) {
      if (this.selectedPriceRange === 'low') {
        return price < 20000;
      } else if (this.selectedPriceRange === 'medium') {
        return price >= 20000 && price < 50000;
      } else if (this.selectedPriceRange === 'high') {
        return price >= 50000;
      }
      return true;
    },
    formatPrice(value) {
      return new Intl.NumberFormat('vi-VN').format(value);
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.books-view-container {
  padding: 20px;
}

.search-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}

.select-container {
  position: relative;
  flex: 1;
}

.custom-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none;
  background-color: white;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
}

.books-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.book-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-image {
  width: 100%; /* Đảm bảo ảnh chiếm toàn bộ chiều rộng container */
  height: 200px; /* Đặt chiều cao cố định */
  object-fit: cover; /* Đảm bảo giữ tỷ lệ ảnh và cắt phần thừa */
  border-radius: 8px; /* Bo góc cho ảnh */
  background-color: #f0f0f0; /* Màu nền khi ảnh không tải được */
}


.book-info {
  padding: 10px;
  text-align: center;
}

.book-title {
  font-size: 1.1em;
  margin: 5px 0;
}

.book-author {
  color: #555;
}

.book-price {
  color: #e74c3c;
  font-weight: bold;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-controls button {
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-controls button:hover:not(:disabled) {
  background-color: #2980b9;
}
</style>