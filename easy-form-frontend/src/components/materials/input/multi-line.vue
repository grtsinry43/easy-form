<template>
  <n-space vertical>
    <n-h2> 多行文本输入</n-h2>
    <n-p> 而有些问题，等待你洋洋洒洒去书写</n-p>
    <n-input
      v-model:value="value"
      type="textarea"
      placeholder="在这里书写吧"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(null),
    }
  },
})
</script>
