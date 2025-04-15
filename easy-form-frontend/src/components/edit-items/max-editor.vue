<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps<{
  value: string[]
  currentValue: number
  configKey: string
}>()

const updateVal = inject('updateVal') as ((key: string, value: number) => void) | undefined

const selectHandle = (val: number) => {
  if (updateVal) {
    updateVal(props.configKey, val)
  }
}
</script>

<template>
  <n-space vertical class="mb-2 w-full mt-4">
    <n-p class="font-bold">最大评分值</n-p>
    <n-select
      :value="props.currentValue"
      :options="props.value.map((item, index) => ({ label: item, value: index }))"
      @update:value="selectHandle"
    />
  </n-space>
</template>
