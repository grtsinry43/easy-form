<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  maxlength?: number
  showCount?: boolean
  rows?: number
  autosize?: boolean | { minRows?: number; maxRows?: number }
}

const props = withDefaults(defineProps<Props>(), {
  label: '文本域',
  required: false,
  disabled: false,
  placeholder: '请输入',
  maxlength: 1000,
  showCount: true,
  rows: 3,
  autosize: false
})

const value = ref('')
</script>

<template>
  <div class="w-full">
    <div class="flex items-center mb-2">
      <span class="text-base">{{ label }}</span>
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </div>
    <n-input
      v-model:value="value"
      type="textarea"
      :disabled="disabled"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :show-count="showCount"
      :rows="rows"
      :autosize="autosize"
      class="w-full"
    />
  </div>
</template>

<style scoped></style> 