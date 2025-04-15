<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps<{
  value: string
  configKey: string
}>()

const updateVal = inject('updateVal') as ((key: string, value: string) => void) | undefined

const inputHandle = (val: string) => {
  if (updateVal) {
    updateVal(props.configKey, val)
  }
}
</script>

<template>
  <n-space vertical class="mb-2 w-full mt-4">
    <n-p class="font-bold">题目标题</n-p>
    <n-input :value="props.value" type="text" placeholder="请输入题目标题"
             @update:value="inputHandle"
    />
  </n-space>
</template>
