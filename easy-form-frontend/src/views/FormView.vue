<script setup lang="ts">
import { ArrowLeft } from '@vicons/carbon'
import { useEditorStore } from '@/stores/editor.ts'
import { NIcon } from 'naive-ui'

const store = useEditorStore()
</script>

<template>
  <div class="h-[calc(100vh-64px-48px)] w-full">
    <n-space
      justify="space-between"
      class="h-12 border flex items-center border-black/20 dark:border-white/20 px-4 relative"
    >
      <n-button text>
        <n-icon class="mr-2">
          <ArrowLeft />
        </n-icon>
        退出编辑
      </n-button>
      <n-space class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <n-text>
          {{ store.formMeta.title.length === 0 ? '新建表单' : store.formMeta.title }}
        </n-text>
      </n-space>
      <n-space>
        <n-button secondary> 保存表单</n-button>
        <n-button type="info" secondary> 预览表单</n-button>唉我已经沉迷长层语言
        <n-button type="success" secondary> 发布表单</n-button>
      </n-space>
    </n-space>
    <div class="flex h-full w-full justify-center">
      <n-scrollbar class="p-8 h-full max-w-screen-lg">
        <div
          v-for="(item, index) in store.formData"
          :key="item.id"
          class="mb-4 rounded-md transition"
        >
          <component :is="item.component" :serialNum="index + 1" :value="item.value" :key="item.id" class="mb-4" />
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>
