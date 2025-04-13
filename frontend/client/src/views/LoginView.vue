<template>
  <div class="auth-container">
    <div class="auth-background">
      <a-card class="auth-card">
        <h2>Chào mừng bạn đến với BookStore</h2>
        <p class="welcome-text">Vui lòng đăng nhập để tiếp tục</p>
        <a-form :model="formData" @submit.prevent="handleLogin" layout="vertical">
          <a-form-item label="Email" name="email" :rules="[ { required: true, message: 'Vui lòng nhập email!' } ]">
            <a-input v-model:value="formData.email" placeholder="Nhập email của bạn" />
          </a-form-item>
          <a-form-item label="Mật khẩu" name="password" :rules="[ { required: true, message: 'Vui lòng nhập mật khẩu!' } ]">
            <a-input type="password" v-model:value="formData.password" placeholder="Nhập mật khẩu của bạn" />
          </a-form-item>
          <a-button type="primary" html-type="submit" block>Đăng nhập</a-button>
        </a-form>
        <p class="switch-text">Chưa có tài khoản? <a @click="switchToRegister">Đăng ký ngay</a></p>
      </a-card>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/apis/authApi';
import { message } from 'ant-design-vue';
import { eventBus } from '@/eventBus'; 

export default {
  name: 'LoginView',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await loginUser(this.formData);
        if (response.success) {
          //localStorage.setItem('user', JSON.stringify(response.data.user));
          // Cập nhật thông tin người dùng trong eventBus
          eventBus.setUser(response.data.user);
          localStorage.setItem('token', JSON.stringify(response.data.token));

          this.$router.push('/');
          message.success('Đăng nhập thành công!');
        } else {
          message.error(response.message || 'Đăng nhập thất bại!');
        }
      } catch (error) {
        message.error(error.message || 'Có lỗi xảy ra!');
      }
    },
    switchToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://source.unsplash.com/random/1920x1080') no-repeat center center;
  background-size: cover;
}

.auth-background {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.auth-card {
  width: 400px;
  text-align: center;
}

.auth-card h2 {
  margin-bottom: 10px;
  color: #333;
}

.welcome-text {
  margin-bottom: 20px;
  color: #666;
}

.switch-text {
  margin-top: 20px;
  color: #1890ff;
}

a-input {
  margin-bottom: 15px;
}

a-button {
  margin-top: 20px;
}

.ant-card-bordered {
  border: 0px solid #f0f0f0;
}
</style> 