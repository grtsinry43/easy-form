<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps<{
  value: string
  configKey: string
}>()

const updateVal = inject('updateVal') as ((key: string, value: string) => void) | undefined

const selectHandle = (val: string) => {
  if (updateVal) {
    updateVal(props.configKey, val)
  }
}

const options = [
  { label: 'HH:mm', value: 'HH:mm' },
  { label: 'HH:mm:ss', value: 'HH:mm:ss' },
  { label: 'HH:mm:ss.SSS', value: 'HH:mm:ss.SSS' },
]
</script>

<template>
  <n-space vertical class="mb-2 w-full mt-4">
    <n-p class="font-bold">时间格式</n-p>
    <n-select :value="props.value" :options="options" @update:value="selectHandle" />
  </n-space>
</template>
