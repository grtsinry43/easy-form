<script setup lang="ts">
import { defineProps, inject } from 'vue'

const props = defineProps<{
  value: string[]
  currentValue: number
  configKey: string
}>()

const updateVal = inject('updateVal') as ((key: string, value: any) => void) | undefined

const addOption = () => {
  if (updateVal) {
    updateVal(props.configKey, [...props.value, `选项${props.value.length + 1}`])
  }
}

const removeOption = (index: number) => {
  const updatedValue = [...props.value]
  updatedValue.splice(index, 1)
  if (updateVal) {
    updateVal(props.configKey, updatedValue)
  }
}

const updateOptionText = (index: number, text: string) => {
  const updatedValue = [...props.value]
  updatedValue[index] = text
  if (updateVal) {
    updateVal(props.configKey, updatedValue)
  }
}
</script>

<template>
  <n-space vertical class="mb-2">
    <n-p class="font-bold">选项内容</n-p>
    <div v-for="(option, index) in value" :key="index" class="option-item">
      <n-input
        :value="value[index]"
        type="text"
        placeholder="选项内容"
        @update:value="(text) => updateOptionText(index, text)"
      />
      <n-button @click="removeOption(index)" type="error">删除</n-button>
    </div>
    <n-button @click="addOption" type="primary">添加选项</n-button>
  </n-space>
</template>

<style scoped>
.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
