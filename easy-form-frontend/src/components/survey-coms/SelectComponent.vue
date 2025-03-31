<script setup lang="ts">
import { ref } from 'vue'

interface Option {
  label: string
  value: string | number
}

interface Props {
  label?: string
  options?: Option[]
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  placeholder?: string
  maxTagCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: '选择',
  options: () => [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' }
  ],
  multiple: false,
  required: false,
  disabled: false,
  placeholder: '请选择',
  maxTagCount: 3
})

const value = ref<string | number | (string | number)[]>(props.multiple ? [] : '')
</script>

<template>
  <div class="w-full">
    <div class="flex items-center mb-2">
      <span class="text-base">{{ label }}</span>
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </div>
    <n-select
      v-model:value="value"
      :options="options"
      :multiple="multiple"
      :disabled="disabled"
      :placeholder="placeholder"
      :max-tag-count="maxTagCount"
      class="w-full"
    />
  </div>
</template>

<style scoped></style> 