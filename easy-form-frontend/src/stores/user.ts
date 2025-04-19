import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const userInfo = ref({
    nickname: '',
    username: '',
    oauthProvider: '',
    email: '',
    avatar: '',
  })

  const setLogin = (status: boolean) => {
    isLogin.value = status
  }

  const setUserInfo = (info: {
    nickname: string
    username: string
    oauthProvider: string
    email: string
    avatar: string
  }) => {
    userInfo.value = info
  }

  return {
    isLogin,
    userInfo,
    setLogin,
    setUserInfo,
  }
})
