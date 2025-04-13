<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Trang chủ</a-breadcrumb-item>
      <a-breadcrumb-item>Quản lý đơn hàng</a-breadcrumb-item>
    </a-breadcrumb>
    <a-table
      :columns="columns"
      :dataSource="orders"
      :pagination="{ pageSize: 10 }"
      rowKey="id"
    >
      <template #bodyCell="{ column, record }">
        <span v-if="column.key === 'actions' && record.status !== 'Đã hủy'">
          <a @click="showEditModal(record)" style="margin-right: 8px;">Cập nhật trạng thái</a>
          <a @click="showViewModal(record)" style="margin-right: 8px;">Xem chi tiết</a>
        </span>
        <span v-else-if="column.key === 'order_date'">
          {{ formatDate(record.order_date) }}
        </span>
        <span v-else-if="column.key === 'total_price'">
          {{ formatCurrency(record.total_price) }}
        </span>
        <span v-else>{{ record[column.dataIndex] || '-' }}</span>
      </template>
    </a-table>
    <a-modal
      v-model:visible="isModalVisible"
      title="Cập nhật trạng thái đơn hàng"
      @ok="handleOk"
      @cancel="handleCancel"
      width="600px"
    >
      <a-form :model="formData" ref="orderForm" layout="vertical">
        <a-form-item label="Trạng thái" name="status" style="margin-bottom: 10px;">
          <a-select v-model:value="formData.status" placeholder="Chọn trạng thái">
            <a-select-option value="Hủy đơn">Hủy đơn</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:visible="isViewModalVisible"
      title="Chi tiết đơn hàng"
      @cancel="handleViewCancel"
      width="800px"
    >
      <div v-if="selectedOrderBooks.length">
        <div v-for="book in selectedOrderBooks" :key="book.id" class="book-detail">
          <img :src="book.image" alt="Book cover" class="book-image" style="width: 250px; height: auto; border-radius: 8px;" />
          <div class="book-info">
            <h3>{{ book.title }}</h3>
            <p>Tác giả: {{ book.author }}</p>
            <p>Thể loại: {{ book.genre }}</p>
            <p>Giá: {{ formatCurrency(book.price) }}</p>
            <p>Số lượng: {{ book.quantity }}</p>
            <p>Nhà xuất bản: {{ book.publisher }}</p>
            <p>Năm xuất bản: {{ book.publicationYear }}</p>
            <p>Mô tả: {{ book.description }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Không có thông tin sách để hiển thị.</p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { updateOrderStatus, searchOrders, getOrderByUserId } from '@/apis/ordersApi';
import { message } from 'ant-design-vue';
import moment from 'moment';

export default {
  name: 'OrderView',
  data() {
    return {
      orders: [],
      columns: [
        {
          title: 'Mã người dùng',
          dataIndex: 'user_id',
          key: 'user_id',
        },
        {
          title: 'Ngày đặt hàng',
          dataIndex: 'order_date',
          key: 'order_date',
        },
        {
          title: 'Số lượng',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Tổng giá',
          dataIndex: 'total_price',
          key: 'total_price',
        },
        {
          title: 'Trạng thái',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Hành động',
          key: 'actions',
        },
      ],
      isModalVisible: false,
      isViewModalVisible: false,
      formData: {
        id: null,
        status: '',
      },
      selectedOrderBooks: [],
    };
  },
  async created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
          const data = await getOrderByUserId(user.id);
          this.orders = data;
        } else {
          alert('Vui lòng đăng nhập để xem đơn hàng.');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        console.error('Có lỗi xảy ra khi tải đơn hàng.');
      }
    },
    async handleSearch(query) {
      try {
        const data = await searchOrders(query);
        this.orders = data;
      } catch (error) {
        message.error(error.message || 'Có lỗi xảy ra khi tìm kiếm đơn hàng!');
      }
    },
    showEditModal(record) {
      this.formData = { id: record.id, status: record.status };
      this.isModalVisible = true;
    },
    async handleOk() {
      try {
        await updateOrderStatus(this.formData.id, this.formData.status);
        message.success('Cập nhật trạng thái đơn hàng thành công!');
        this.isModalVisible = false;
        this.fetchOrders();
      } catch (error) {
        message.error(error.message || 'Có lỗi xảy ra!');
      }
    },
    handleCancel() {
      this.isModalVisible = false;
    },
    showViewModal(record) {
      this.selectedOrderBooks = record.books || [];
      this.isViewModalVisible = true;
    },
    handleViewCancel() {
      this.isViewModalVisible = false;
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
  },
};
</script>

<style scoped>
.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.book-detail {
  display: flex;
  margin-bottom: 16px;
}
.book-image {
  width: 100px;
  height: auto;
  margin-right: 16px;
}
.book-info {
  flex: 1;
}
</style> 