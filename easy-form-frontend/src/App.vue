<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from '@/utils/theme.ts'
import { darkTheme, lightTheme } from 'naive-ui'
import customTheme from '@/styles/customTheme.ts'
import NavBar from '@/components/NavBar.vue'

const { theme, resolvedTheme, setTheme } = useTheme()
</script>

<template>
  <n-config-provider
    :theme="resolvedTheme === 'light' ? lightTheme : darkTheme"
    :theme-overrides="resolvedTheme === 'dark' ? customTheme.dark : customTheme.light"
  >
    <NavBar />
    <RouterView />
  </n-config-provider>
</template>

<style scoped></style>
