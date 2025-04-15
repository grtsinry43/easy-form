<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps<{
  value: string | string[]
  configKey: string
}>()

const updateVal = inject('updateVal') as
  | ((key: string, value: string | string[]) => void)
  | undefined

const inputHandle = (val: string) => {
  if (updateVal) {
    if (Array.isArray(props.value)) {
      const newValue = [...props.value]
      newValue[0] = val
      updateVal(props.configKey, newValue)
    } else {
      updateVal(props.configKey, val)
    }
  }
}

const addImage = () => {
  if (updateVal && Array.isArray(props.value)) {
    const newValue = [...props.value, '']
    updateVal(props.configKey, newValue)
  }
}

const removeImage = (index: number) => {
  if (updateVal && Array.isArray(props.value)) {
    const newValue = props.value.filter((_, i) => i !== index)
    updateVal(props.configKey, newValue)
  }
}

const updateImage = (index: number, val: string) => {
  if (updateVal && Array.isArray(props.value)) {
    const newValue = [...props.value]
    newValue[index] = val
    updateVal(props.configKey, newValue)
  }
}
</script>

<template>
  <n-space vertical class="mb-2 w-full mt-4">
    <n-p class="font-bold">图片URL</n-p>
    <template v-if="Array.isArray(value)">
      <div v-for="(url, index) in value" :key="index" class="mb-4">
        <n-input
          :value="url"
          type="text"
          :placeholder="`请输入图片URL ${index + 1}`"
          @update:value="(val: string) => updateImage(index, val)"
        />
        <n-image v-if="url" :src="url" :preview-disabled="true" class="mt-2" />
        <n-button type="error" size="small" class="mt-2" @click="removeImage(index)">
          删除
        </n-button>
      </div>
      <n-button type="primary" @click="addImage">添加图片</n-button>
    </template>
    <template v-else>
      <n-input :value="value" type="text" placeholder="请输入图片URL" @update:value="inputHandle" />
      <n-image v-if="value" :src="value" :preview-disabled="true" class="mt-2" />
    </template>
  </n-space>
</template>
