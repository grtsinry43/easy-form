<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  maxlength?: number
  showCount?: boolean
  type?: 'text' | 'password' | 'email' | 'tel'
}

const props = withDefaults(defineProps<Props>(), {
  label: '文本输入',
  placeholder: '请输入',
  required: false,
  disabled: false,
  maxlength: 100,
  showCount: true,
  type: 'text'
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
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :show-count="showCount"
      class="w-full"
    />
  </div>
</template>

<style scoped></style> 