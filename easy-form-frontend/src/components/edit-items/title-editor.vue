<template>
  <n-space vertical>
    <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
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
