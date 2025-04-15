<script setup lang="ts">
import { defineProps, computed, inject } from 'vue'
import { ItalicOutlined } from '@vicons/antd'

const props = defineProps<{
  value: string[]
  currentValue: number
  configKey: string
}>()

const updateVal = inject('updateVal') as ((key: string, value: number) => void) | undefined

const buttonProps = computed(() => {
  return props.currentValue === 1
    ? { strong: true, secondary: true, type: 'primary' } // "斜体"
    : { quaternary: true } // "正常"
})

const toggleItalic = () => {
  if (updateVal) {
    updateVal(props.configKey, props.currentValue === 1 ? 0 : 1)
  }
}
</script>

<template>
  <n-space class="w-full">
    <n-button v-bind="buttonProps" @click="toggleItalic">
      <n-icon>
        <ItalicOutlined />
      </n-icon>
    </n-button>
  </n-space>
</template>
