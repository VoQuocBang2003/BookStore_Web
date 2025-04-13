<template>
  <div class="auth-container">
    <div class="auth-background">
      <a-card class="auth-card">
        <h2>Đăng ký tài khoản</h2>
        <p class="welcome-text">Vui lòng điền thông tin để đăng ký</p>
        <a-form :model="formData" @submit.prevent="handleRegister" layout="vertical">
          <a-form-item label="Email" name="email" :rules="[ { required: true, message: 'Vui lòng nhập email!' } ]">
            <a-input v-model:value="formData.email" placeholder="Nhập email của bạn" />
          </a-form-item>
          <a-form-item label="Số điện thoại" name="phone" :rules="[ { required: true, message: 'Vui lòng nhập số điện thoại!' } ]">
            <a-input v-model:value="formData.phone" placeholder="Nhập số điện thoại của bạn" />
          </a-form-item>
          <a-form-item label="Tên người dùng" name="username" :rules="[ { required: true, message: 'Vui lòng nhập tên người dùng!' } ]">
            <a-input v-model:value="formData.username" placeholder="Nhập tên người dùng của bạn" />
          </a-form-item>
          <a-form-item label="Mật khẩu" name="password" :rules="[ { required: true, message: 'Vui lòng nhập mật khẩu!' } ]">
            <a-input type="password" v-model:value="formData.password" placeholder="Nhập mật khẩu của bạn" />
          </a-form-item>
          <a-button type="primary" html-type="submit" block>Đăng ký</a-button>
        </a-form>
        <p class="switch-text">Đã có tài khoản? <a @click="switchToLogin">Đăng nhập</a></p>
      </a-card>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/apis/authApi';
import { message } from 'ant-design-vue';

export default {
  name: 'RegisterView',
  data() {
    return {
      formData: {
        email: '',
        phone: '',
        username: '',
        password: '',
        role: 'isClient', // Default role for new users
      },
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await registerUser(this.formData);
        if (response) {
          message.success('Đăng ký thành công! Vui lòng đăng nhập.');
          this.$router.push('/login');
        } else {
          message.error(response.message || 'Đăng ký thất bại!');
        }
      } catch (error) {
        message.error(error.message || 'Có lỗi xảy ra!');
      }
    },
    switchToLogin() {
      this.$router.push('/login');
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