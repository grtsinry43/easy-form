<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { PlusOutlined } from '@vicons/antd'
import { useMessage } from 'naive-ui'

const props = defineProps<{
  value: string[]
  currentValue: number
  configKey: string
}>()

const message = useMessage()
const updateVal = inject('updateVal') as ((key: string, value: string[]) => void) | undefined

const addOption = () => {
  if (updateVal) {
    updateVal(props.configKey, [...props.value, ` 选项 ${props.value.length + 1}`])
  }
}

const removeOption = (index: number) => {
  if (props.value.length <= 2) {
    message.warning('再少就没法选了欸')
    return
  }

  const updatedValue = [...props.value]
  updatedValue.splice(index, 1)
  if (updateVal) {
    updateVal(props.configKey, updatedValue)
    message.success('删除选项成功')
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
  <n-space vertical class="mb-2 mt-4">
    <n-p class="font-bold"> 选项内容</n-p>
    <div v-for="(option, index) in value" :key="index" class="option-item">
      <n-input
        :value="value[index]"
        type="text"
        placeholder="选项内容"
        @update:value="(text: string) => updateOptionText(index, text)"
      />
      <n-button @click="removeOption(index)" type="error"> 删除</n-button>
    </div>
    <n-button @click="addOption" size="small" class="w-full">
      <slot>
        <n-icon>
          <PlusOutlined />
        </n-icon>
      </slot>
    </n-button>
  </n-space>
</template>

<style scoped>
.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
</style>
