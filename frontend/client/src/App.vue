<template>
  <div>
    <AppHeader  />
    <a-layout style="min-height: 100vh">
      <a-layout>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer class="footer">
          <div class="footer-content">
            <div class="footer-section">
              <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png" alt="Logo" class="footer-logo">
              <p>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM<br>
              Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA<br>
              60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</p>
              <p>Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi.</p>
            </div>
            <div class="footer-section">
              <h4>DỊCH VỤ</h4>
              <ul>
                <li>Điều khoản sử dụng</li>
                <li>Chính sách bảo mật thông tin cá nhân</li>
                <li>Chính sách bảo mật thanh toán</li>
                <li>Giới thiệu Fahasa</li>
                <li>Hệ thống trung tâm - nhà sách</li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>HỖ TRỢ</h4>
              <ul>
                <li>Chính sách đổi - trả - hoàn tiền</li>
                <li>Chính sách bảo hành - bồi hoàn</li>
                <li>Chính sách vận chuyển</li>
                <li>Chính sách khách sỉ</li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>TÀI KHOẢN CỦA TÔI</h4>
              <ul>
                <li>Đăng nhập/Tạo mới tài khoản</li>
                <li>Thay đổi địa chỉ khách hàng</li>
                <li>Chi tiết tài khoản</li>
                <li>Lịch sử mua hàng</li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>LIÊN HỆ</h4>
              <p>60-62 Lê Lợi, Q.1, TP. HCM</p>
              <p>Email: cskh@fahasa.com.vn</p>
              <p>Phone: 1900636467</p>
            </div>
          </div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import { isLoggedIn } from './store/authState';

export default {
  name: 'App',
  components: {
    AppHeader
  },
  setup() {
    return { isLoggedIn };
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
}

#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.footer {
  background-color: #f0f0f0;
  padding: 40px 20px;
  font-size: 16px;
  color: #333;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;
}

.footer-section {
  flex: 0 1 20%;
  min-width: 200px;
  margin-bottom: 20px;
  padding-right: 20px;
}

.footer-logo {
  height: 50px;
  margin-bottom: 10px;
}

.footer-section h4 {
  margin-bottom: 15px;
  font-size: 18px;
  color: #000;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section p {
  margin: 5px 0;
  line-height: 1.6;
}
</style>
