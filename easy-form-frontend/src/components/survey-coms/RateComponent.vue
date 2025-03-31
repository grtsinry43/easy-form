<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
  count?: number
  size?: 'small' | 'medium' | 'large'
  allowHalf?: boolean
  clearable?: boolean
  defaultValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: '评分',
  required: false,
  disabled: false,
  count: 5,
  size: 'medium',
  allowHalf: false,
  clearable: true,
  defaultValue: 0
})

const value = ref<number>(props.defaultValue)
</script>

<template>
  <div class="w-full">
    <div class="flex items-center mb-2">
      <span class="text-base">{{ label }}</span>
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </div>
    <n-rate
      v-model:value="value"
      :disabled="disabled"
      :count="count"
      :size="size"
      :allow-half="allowHalf"
      :clearable="clearable"
    />
  </div>
</template>

<style scoped></style> 