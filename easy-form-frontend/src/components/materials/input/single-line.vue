<template>
  <n-space vertical>
    <n-h2> 单行文本输入</n-h2>
    <n-p> 有些问题，要的是精炼的答案</n-p>
    <n-input v-model:value="value" type="text" placeholder="在这里书写吧" />
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
