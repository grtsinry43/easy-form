<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { BoldOutlined } from '@vicons/antd'

const props = defineProps<{
  value: string[]
  currentValue: number
}>()

const buttonProps = computed(() => {
  return props.currentValue === 1
    ? { strong: true, secondary: true, type: 'primary' } // "加粗"
    : { quaternary: true } // "正常"
})
</script>

<template>
  <n-space>
    <n-button v-bind="buttonProps">
      <n-icon>
        <BoldOutlined />
      </n-icon>
    </n-button>
  </n-space>
</template>
