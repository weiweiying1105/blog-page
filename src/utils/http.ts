import request from './request'
import type { AxiosRequestConfig } from 'axios'

export interface HttpResponse<T = any> {
  code: number
  data: T
  message: string
}

export class Http {
  // GET 请求
  static async get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await request.get<HttpResponse<T>>(url, {
      params,
      ...config
    })
    return response
  }

  // POST 请求
  static async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await request.post<HttpResponse<T>>(url, data, config)
    return response
  }

  // PUT 请求
  static async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await request.put<HttpResponse<T>>(url, data, config)
    return response
  }

  // DELETE 请求
  static async delete<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await request.delete<HttpResponse<T>>(url, {
      params,
      ...config
    })
    return response
  }

  // PATCH 请求
  static async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await request.patch<HttpResponse<T>>(url, data, config)
    return response
  }

  // 上传文件
  static async upload<T = any>(
    url: string,
    file: File,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await request.post<HttpResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    })
    return response
  }

  // 下载文件
  static async download(
    url: string,
    filename?: string,
    config?: AxiosRequestConfig
  ): Promise<void> {
    const response = await request.get(url, {
      responseType: 'blob',
      ...config
    })

    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  }
}

export default Http 