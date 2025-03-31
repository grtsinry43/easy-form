<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label?: string
  type?: 'date' | 'datetime' | 'month' | 'year' | 'daterange'
  required?: boolean
  disabled?: boolean
  placeholder?: string
  clearable?: boolean
  format?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '日期选择',
  type: 'date',
  required: false,
  disabled: false,
  placeholder: '请选择日期',
  clearable: true,
  format: 'yyyy-MM-dd'
})

const value = ref<number | null>(null)
</script>

<template>
  <div class="w-full">
    <div class="flex items-center mb-2">
      <span class="text-base">{{ label }}</span>
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </div>
    <n-date-picker
      v-model:value="value"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      :clearable="clearable"
      :format="format"
      class="w-full"
    />
  </div>
</template>

<style scoped></style> 