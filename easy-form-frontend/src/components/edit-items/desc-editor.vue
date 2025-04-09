<template>
  <n-space vertical>
    <n-input v-model:value="value" type="textarea" placeholder="请输入描述文本" />
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
