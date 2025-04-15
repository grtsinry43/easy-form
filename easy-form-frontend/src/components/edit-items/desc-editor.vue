<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps<{
  value: string
  configKey: string
}>()

const updateVal = inject('updateVal') as ((key: string, value: string) => void) | undefined

const handleInput = (val: string) => {
  if (updateVal) {
    updateVal(props.configKey, val)
  }
}
</script>

<template>
  <n-space vertical class="mb-2">
    <n-p class="font-bold">题目描述</n-p>
    <n-input
      :value="value"
      type="textarea"
      placeholder="请输入题目描述"
      @update:value="handleInput"
    />
  </n-space>
</template>
