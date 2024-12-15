<template>
  <div class="register-container">
    <div class="register-box">
      <h2>管理员注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            type="text"
            id="username"
            v-model="registerForm.username"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="registerForm.password"
            placeholder="请输入密码"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="registerForm.confirmPassword"
            placeholder="请再次输入密码"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input
            type="email"
            id="email"
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            required
          />
        </div>
        <button type="submit" class="register-button" @click="handleRegister">注册</button>
        <div class="login-link">
          已有账号？<router-link to="/admin/login">去登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Http from '@/utils/http'

interface RegisterForm {
  username: string
  password: string
  confirmPassword: string
  email: string
}

const router = useRouter()
const registerForm = reactive<RegisterForm>({
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
})

const handleRegister = async () => {
  try {
    // 表单验证
    if (registerForm.password !== registerForm.confirmPassword) {
      console.error('两次输入的密码不一致')
      return
    }

    const response = await Http.post<{ token: string }>('/register', {
      username: registerForm.username,
      password: registerForm.password,
      email: registerForm.email
    })

    if (response.code === 200) {
      // 注册成功，保���token并跳转
      localStorage.setItem('token', response.data.token)
      router.push('/admin/login')
    }
  } catch (error) {
    console.error('注册失败:', error)
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.register-box {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #1677ff;
  box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
}

.register-button {
  width: 100%;
  padding: 0.8rem;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #0958d9;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.login-link a {
  color: #1677ff;
  text-decoration: none;
  margin-left: 0.5rem;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
