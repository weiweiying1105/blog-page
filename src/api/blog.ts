import Http from '@/utils/http'

interface Blog {
  id: number
  title: string
  content: string
}

// 获取博客列表
export const getBlogs = async (params?: { page: number; size: number }) => {
  const response = await Http.get<Blog[]>('/blogs', params)
  return response.data
}

// 创建博客
export const createBlog = async (data: Omit<Blog, 'id'>) => {
  const response = await Http.post<Blog>('/blogs', data)
  return response.data
}

// 上传图片
export const uploadImage = async (file: File) => {
  const response = await Http.upload<{ url: string }>('/upload', file)
  return response.data
}

// 下载文件
export const downloadFile = async (fileId: string) => {
  await Http.download(`/files/${fileId}`, 'my-file.pdf')
} 