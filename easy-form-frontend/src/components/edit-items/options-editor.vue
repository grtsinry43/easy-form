<template>
  <n-space vertical>
    <div v-for="(option, index) in options" :key="index" class="option-item">
      <n-input v-model:value="options[index]" type="text" placeholder="选项内容" />
      <n-button @click="removeOption(index)" type="error" size="small">删除</n-button>
    </div>
    <n-button @click="addOption" type="primary">添加选项</n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const options = ref(['选项1', '选项2'])

    const addOption = () => {
      options.value.push(`选项${options.value.length + 1}`)
    }

    const removeOption = (index: number) => {
      options.value.splice(index, 1)
    }

    return {
      options,
      addOption,
      removeOption,
    }
  },
})
</script>

<style scoped>
.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
