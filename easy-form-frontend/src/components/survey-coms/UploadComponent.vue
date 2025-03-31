<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  accept?: string
  maxSize?: number
  maxCount?: number
  listType?: 'text' | 'image' | 'image-card'
  showFileList?: boolean
  showPreviewButton?: boolean
  showRemoveButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '上传',
  required: false,
  disabled: false,
  multiple: false,
  accept: '*',
  maxSize: 10,
  maxCount: 5,
  listType: 'text',
  showFileList: true,
  showPreviewButton: true,
  showRemoveButton: true
})

const fileList = ref<any[]>([])

const handleBeforeUpload = (data: { file: File }) => {
  const isLtMaxSize = data.file.size / 1024 / 1024 < props.maxSize
  if (!isLtMaxSize) {
    message.error(`文件大小不能超过 ${props.maxSize}MB!`)
    return false
  }
  return true
}

const handleExceed = () => {
  message.error(`最多只能上传 ${props.maxCount} 个文件!`)
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center mb-2">
      <span class="text-base">{{ label }}</span>
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </div>
    <n-upload
      v-model:file-list="fileList"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      :max="maxCount"
      :list-type="listType"
      :show-file-list="showFileList"
      :show-preview-button="showPreviewButton"
      :show-remove-button="showRemoveButton"
      :before-upload="handleBeforeUpload"
      :on-exceed="handleExceed"
      class="w-full"
    >
      <n-button>选择文件</n-button>
      <template #trigger>
        <n-button v-if="multiple" class="ml-2">选择多个文件</n-button>
      </template>
    </n-upload>
  </div>
</template>

<style scoped></style> 