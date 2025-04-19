// src/api/request.ts
import axios from 'axios'
import { getToken, setToken } from '@/utils/token.ts'

// 创建一个函数，用于在组件中传递消息
let showMessage: (msg: string) => void

export function setMessageHandler(handler: (msg: string) => void) {
  showMessage = handler
}

export const request = axios.create({
  baseURL: '/api', // 请求的基础 URL
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    if (showMessage) {
      showMessage('请求出现错误：' + error.message)
    }
    return Promise.reject(error)
  },
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.headers.Authorization) {
        setToken(response.headers.Authorization)
      }
      if (response.data.code !== 0) {
        if (showMessage) {
          showMessage(response.data.msg)
        }
        return null
      } else {
        return response.data
      }
    }
    return null
  },
  (error) => {
    return Promise.reject(error)
  },
)
