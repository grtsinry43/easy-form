<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from '@/utils/theme.ts'
import { darkTheme, lightTheme } from 'naive-ui'
import customTheme from '@/styles/customTheme.ts'
import NavBar from '@/components/NavBar.vue'

const { theme, resolvedTheme, setTheme } = useTheme()

const toggleTheme = () => {
  console.log(resolvedTheme)
  setTheme(resolvedTheme.value === 'light' ? 'dark' : 'light')
}
</script>

<template>
  <n-config-provider
    :theme="resolvedTheme === 'light' ? lightTheme : darkTheme"
    :theme-overrides="resolvedTheme === 'dark' ? customTheme.dark : customTheme.light"
  >
    <n-message-provider>
      <NavBar />
      <div class="h-16 w-full"></div>
      <div class="max-w-screen-2xl mx-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
