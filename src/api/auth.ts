import Http from '@/utils/http'

// 定义接口返回类型
interface LoginResult {
  token: string
  user: {
    id: number
    username: string
    role: string
  }
}

// 定义请求参数类型
interface LoginParams {
  username: string
  password: string
}

// 登录
export const login = async (params: LoginParams) => {
  const response = await Http.post<LoginResult>('/login', params)
  return response.data
}

// 获取用户信息
export const getUserInfo = async () => {
  const response = await Http.get<LoginResult>('/user/info')
  return response.data
} 