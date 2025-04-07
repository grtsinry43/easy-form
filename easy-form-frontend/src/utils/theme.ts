import { ref, computed } from 'vue'

// 创建全局响应式主题状态
const themeState = ref(localStorage.getItem('theme') || 'light')

export function useTheme() {
  // 计算属性，确保它是响应式的
  const resolvedTheme = computed(() => themeState.value)

  const setTheme = (newTheme: 'light' | 'dark') => {
    themeState.value = newTheme
    localStorage.setItem('theme', newTheme)

    // 应用到 HTML 元素上，以便 TailwindCSS dark 模式工作
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // 初始化主题
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')

    // 设置初始主题
    setTheme(initialTheme as 'light' | 'dark')
  }

  return {
    resolvedTheme,
    setTheme,
  }
}
