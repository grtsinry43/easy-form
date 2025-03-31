<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">{{ route.meta.title || '组件预览' }}</h2>
        <n-tag type="info" size="small">
          预览模式
        </n-tag>
      </div>
      
      <div class="space-y-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
