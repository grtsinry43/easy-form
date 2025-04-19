import { request } from '@/api/request.ts'

export const getUserInfo = async () => {
  return await request.get('/user/info')
}
