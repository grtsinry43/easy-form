<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFormStore } from '@/stores/form.ts'
import { getFormById } from '@/api/form.ts'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'

const store = useFormStore()
const router = useRouter()
const route = useRoute()
const id = route.params.id as string
const message = useMessage()

export interface FormDetail {
  id: string
  title: string
  description: string
  type: string
  cover: string
  value: string // value 是 formData 的 JSON 字符串
}

// 计算问卷标题
const formTitle = computed(() =>
  store.formMeta.title.length === 0 ? '新建问卷' : store.formMeta.title,
)

onMounted(async () => {
  try {
    const form: FormDetail | null = await getFormById(id)
    if (form) {
      store.initEditorData({
        id: form.id,
        title: form.title,
        description: form.description,
        type: form.type,
        cover: form.cover,
        value: form.value,
      })
    } else {
      message.error(`表单 ID "${id}" 未找到。`)
      router.push({ name: 'not-found' })
    }
  } catch (error) {
    console.error('获取表单数据时出错:', error)
    message.error('加载表单数据失败。')
    // 可以考虑跳转到错误页或主页
    // router.push({ name: 'home' });
  }
})
</script>

<template>
  <div
    class="flex justify-center items-center min-h-[calc(100vh-64px-48px)] p-5 bg-gray-100 dark:bg-black transition-colors duration-300"
  >
    <div
      class="relative w-full max-w-4xl min-h-[80vh] bg-white dark:bg-gray-950 rounded shadow-md dark:shadow-gray-950/50 py-10 overflow-hidden transition-all duration-300"
    >
      <!-- 纸张顶部边框 -->
      <div
        class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700"
      ></div>

      <!-- 纸张纹理 (仅在浅色模式显示) -->
      <div
        class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px] bg-[-1px_-1px]"
      ></div>

      <!-- 问卷标题 -->
      <div
        class="mb-8 text-center border-b border-dashed border-gray-200 dark:border-green-900 pb-5"
      >
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 relative inline-block">
          {{ formTitle }}
          <span
            class="absolute bottom-[-8px] left-[10%] w-[80%] h-0.5 bg-gray-200 dark:bg-gray-700"
          ></span>
        </h1>
      </div>

      <!-- 问卷内容 -->
      <n-scrollbar class="h-[calc(100%-120px)] px-2.5">
        <div class="py-2.5">
          <div
            v-for="(item, index) in store.formData"
            :key="item.id"
            class="flex mb-6 p-4 rounded transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-900 relative"
          >
            <div
              class="flex-shrink-0 w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4 mt-0.5 font-bold text-gray-600 dark:text-gray-300"
            >
              {{ index + 1 }}
            </div>
            <div class="flex-grow">
              <component
                :is="item.component"
                :serialNum="index + 1"
                :value="item.value"
                :key="item.id"
              />
            </div>
          </div>
        </div>
      </n-scrollbar>

      <!-- 纸张底部 -->
      <div
        class="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm pt-5 border-t border-dashed border-gray-200 dark:border-gray-700"
      >
        <span class="relative inline-block">
          <span
            class="before:content-['✧'] before:px-2.5 before:text-gray-300 dark:before:text-gray-600 after:content-['✧'] after:px-2.5 after:text-gray-300 dark:after:text-gray-600"
          >
            感谢您的参与 | 由 EasyForm 提供技术支持
          </span>
        </span>
      </div>

      <!-- 纸张左下角折角效果 -->
      <div
        class="absolute bottom-0 left-0 w-0 h-0 border-solid border-b-[20px] border-r-[20px] border-t-0 border-l-0 border-transparent border-b-gray-100 dark:border-b-gray-900 shadow-[-2px_-2px_5px_rgba(0,0,0,0.05)] dark:shadow-[-2px_-2px_5px_rgba(0,0,0,0.1)] rounded-bl"
      ></div>
    </div>
  </div>
</template>
