<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { ItalicOutlined } from '@vicons/antd'

const props = defineProps<{
  value: string[]
  currentValue: number
}>()

const buttonProps = computed(() => {
  return props.currentValue === 1
    ? { strong: true, secondary: true, type: 'primary' } // "斜体"
    : { quaternary: true } // "正常"
})
</script>

<template>
  <n-space class="w-full">
    <n-button v-bind="buttonProps">
      <n-icon>
        <ItalicOutlined />
      </n-icon>
    </n-button>
  </n-space>
</template>
