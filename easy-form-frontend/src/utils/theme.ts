import { ref, watch, onMounted, onUnmounted } from 'vue'

export const useTheme = () => {
  const theme = ref<'light' | 'dark' | 'system'>('system')
  const resolvedTheme = ref<'light' | 'dark'>('light')

  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
    resolvedTheme.value = newTheme
  }

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'system') {
      applyTheme(getSystemTheme())
    } else {
      applyTheme(newTheme)
    }
  }

  const mediaQuery = window?.matchMedia('(prefers-color-scheme: dark)')
  const handleMediaChange = () => {
    if (theme.value === 'system') {
      applyTheme(getSystemTheme())
    }
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme('system')
    }

    mediaQuery?.addEventListener('change', handleMediaChange)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handleMediaChange)
  })

  watch(theme, (newTheme) => {
    if (newTheme === 'system') {
      applyTheme(getSystemTheme())
    } else {
      applyTheme(newTheme)
    }
  })

  return {
    theme,
    resolvedTheme,
    setTheme,
  }
}
