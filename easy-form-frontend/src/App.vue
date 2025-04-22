<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import { useTheme } from '@/utils/theme.ts'
import { darkTheme } from 'naive-ui'
import customTheme from '@/styles/customTheme.ts'
import NavBar from '@/components/NavBar.vue'
import { zhCN, dateZhCN } from 'naive-ui'

const { resolvedTheme } = useTheme()

const naiveTheme = computed(() => (resolvedTheme.value === 'dark' ? darkTheme : null))

const themeOverrides = computed(() =>
  resolvedTheme.value === 'dark' ? customTheme.dark : customTheme.light,
)
</script>

<template>
  <n-config-provider
    :theme="naiveTheme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-dialog-provider>
      <n-message-provider>
        <n-modal-provider>
          <NavBar />
          <div class="h-16 w-full"></div>
          <!--<router-view v-slot="{ Component, route }">-->
          <!--  <transition name="page-transition" mode="out-in" appear>-->
          <!--    <component :is="Component" :key="route.path" />-->
          <!--  </transition>-->
          <!--</router-view>-->
          <router-view />
        </n-modal-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.2s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(10px);
  filter: blur(5px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  filter: blur(5px);
}
</style>
