<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  round?: boolean
  checkedValue?: string | number | boolean
  uncheckedValue?: string | number | boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '开关',
  required: false,
  disabled: false,
  size: 'medium',
  round: true,
  checkedValue: true,
  uncheckedValue: false
})

const value = ref<boolean>(false)
</script>

<template>
  <div class="w-full">
    <div class="flex items-center mb-2">
      <span class="text-base">{{ label }}</span>
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </div>
    <n-switch
      v-model:value="value"
      :disabled="disabled"
      :size="size"
      :round="round"
      :checked-value="checkedValue"
      :unchecked-value="uncheckedValue"
    />
  </div>
</template>

<style scoped></style> 