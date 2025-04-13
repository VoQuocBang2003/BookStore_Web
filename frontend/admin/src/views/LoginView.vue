<template>
  <div class="login-container">
    <div class="login-background">
      <a-card class="login-card">
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
      </a-card>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/apis/authApi';
import { message } from 'ant-design-vue';
import { isLoggedIn } from '@/store/authState'; 

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
          const user = response.data.user;
          if (user.role !== 'isAdmin') {
            message.error('Bạn không có quyền truy cập. Chỉ quản trị viên mới có thể đăng nhập.');
            return;
          }

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(response.data.token));

          isLoggedIn.value = true;
          this.$router.push('/');
          message.success('Đăng nhập thành công!');
        } else {
          message.error(response.message || 'Đăng nhập thất bại!');
        }
      } catch (error) {
        message.error(error.message || 'Có lỗi xảy ra!');
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://source.unsplash.com/random/1920x1080') no-repeat center center;
  background-size: cover;
}

.login-background {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login-card {
  width: 400px;
  text-align: center;
}

.login-card h2 {
  margin-bottom: 10px;
  color: #333;
}

.welcome-text {
  margin-bottom: 20px;
  color: #666;
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