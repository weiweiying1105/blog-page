import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 环境变量中的 BASE_URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    // 这里可以根据后端返回的状态码做相应的处理
    if (data.code === 200) {
      return data.data
    }
    // 处理其他状态码
    handleErrorStatus(data.code, data.message)
    return Promise.reject(data)
  },
  (error) => {
    // 处理 HTTP 错误状态
    if (error.response) {
      handleErrorStatus(error.response.status, error.response.data.message)
    }
    return Promise.reject(error)
  }
)

// 错误处理函数
function handleErrorStatus(status: number, message: string) {
  switch (status) {
    case 401:
      // 未授权，跳转到登录页
      localStorage.removeItem('token')
      window.location.href = '/admin/login'
      break
    case 403:
      // 权限不足
      console.error('权限不足')
      break
    case 404:
      // 资源不存在
      console.error('请求的资源不存在')
      break
    case 500:
      // 服务器错误
      console.error('服务器错误')
      break
    default:
      console.error(message || '未知错误')
  }
}

export default request 