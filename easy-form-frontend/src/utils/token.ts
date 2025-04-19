import Cookies from 'js-cookie'

export const getToken: () => string = () => {
  return Cookies.get('token') || ''
}

export const setToken = (token: string) => {
  Cookies.set('token', token, { expires: 7 }) // 设置过期时间为 7 天
}
