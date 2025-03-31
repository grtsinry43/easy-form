<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  min?: number
  max?: number
  step?: number
  precision?: number
  showButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '数字输入',
  required: false,
  disabled: false,
  placeholder: '请输入数字',
  min: -Infinity,
  max: Infinity,
  step: 1,
  precision: 0,
  showButton: true
})

const value = ref<number | null>(null)
</script>

<template>
  <div class="w-full">
    <div class="flex items-center mb-2">
      <span class="text-base">{{ label }}</span>
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </div>
    <n-input-number
      v-model:value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :precision="precision"
      :show-button="showButton"
      class="w-full"
    />
  </div>
</template>

<style scoped></style> 