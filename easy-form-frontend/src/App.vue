<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import { useTheme } from '@/utils/theme.ts'
import { darkTheme } from 'naive-ui'
import customTheme from '@/styles/customTheme.ts'
import NavBar from '@/components/NavBar.vue'

const { resolvedTheme } = useTheme()

const naiveTheme = computed(() => (resolvedTheme.value === 'dark' ? darkTheme : null))

const themeOverrides = computed(() =>
  resolvedTheme.value === 'dark' ? customTheme.dark : customTheme.light,
)
</script>

<template>
  <n-config-provider :theme="naiveTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <NavBar />
      <div class="h-16 w-full"></div>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>
