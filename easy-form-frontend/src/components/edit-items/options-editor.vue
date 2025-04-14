<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  value: string[]
  currentValue: number
}>()

const emit = defineEmits(['update:value'])

const addOption = () => {
  emit('update:value', [...props.value, `选项${props.value.length + 1}`])
}

const removeOption = (index: number) => {
  const updatedValue = [...props.value]
  updatedValue.splice(index, 1)
  emit('update:value', updatedValue)
}
</script>

<template>
  <n-space vertical class="mb-2">
    <n-p class="font-bold">选项内容</n-p>
    <div v-for="(option, index) in value" :key="index" class="option-item">
      <n-input :value="value[index]" type="text" placeholder="选项内容" />
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
