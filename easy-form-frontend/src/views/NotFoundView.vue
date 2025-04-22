<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NResult, NButton, NSpace, NSpin, NCard, NDivider } from 'naive-ui'
import { useUserStore } from '@/stores/user.ts'

const router = useRouter()
const loading = ref(false)
const animationComplete = ref(false)

const user = useUserStore()

const goHome = () => {
  loading.value = true
  setTimeout(() => {
    if (user.isLogin) {
      router.push({ name: 'home' })
    } else {
      router.push({ name: 'official' })
    }
  }, 500)
}

const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  setTimeout(() => {
    animationComplete.value = true
  }, 800)
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
  >
    <!-- Stars background with Tailwind -->
    <div class="absolute inset-0 overflow-hidden opacity-30 dark:opacity-60">
      <div class="stars absolute inset-0"></div>
    </div>

    <!-- Naive UI Card with Tailwind enhancements -->
    <NCard
      class="w-11/12 max-w-md transition-all duration-700 ease-out"
      :class="[
        animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        'shadow-xl dark:shadow-2xl',
      ]"
      :bordered="false"
      size="large"
    >
      <!-- Naive UI Result component -->
      <NResult status="404" title="页面走丢了" description="抱歉，您访问的页面不存在或已被移除">
        <!-- Custom icon using Tailwind -->
        <template #icon>
          <div class="relative w-24 h-24 mx-auto">
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 rounded-full opacity-90"
            ></div>
            <div
              class="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
            >
              <span
                class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500"
                >404</span
              >
            </div>
            <div class="absolute -top-2 -right-2 w-6 h-6 animate-bounce">
              <NSpin size="small" />
            </div>
          </div>
        </template>

        <!-- Footer with Naive UI components -->
        <template #footer>
          <NDivider />
          <NSpace justify="center">
            <NButton
              type="primary"
              @click="goHome"
              :loading="loading"
              size="large"
              round
              class="transform hover:-translate-y-0.5 transition-transform duration-200"
            >
              返回首页
            </NButton>
            <NButton
              @click="goBack"
              size="large"
              round
              secondary
              class="transform hover:-translate-y-0.5 transition-transform duration-200"
            >
              返回上一页
            </NButton>
          </NSpace>
        </template>
      </NResult>
    </NCard>
  </div>
</template>

<style>
/* Tailwind classes will handle most styling, but we keep the stars animation */
.stars {
  background-image:
    radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0, 0, 0, 0));
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: twinkle 5s infinite;
}

@keyframes twinkle {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
