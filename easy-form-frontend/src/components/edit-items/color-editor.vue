<template>
  <n-space vertical>
    <n-color-picker v-model:value="value" :swatches="swatches" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('#000000')
    const swatches = [
      '#000000',
      '#FFFFFF',
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFFF00',
      '#00FFFF',
      '#FF00FF',
      '#909399',
      '#C0C4CC',
      '#DCDFE6',
      '#E4E7ED',
      '#EBEEF5',
      '#F2F6FC',
    ]

    return {
      value,
      swatches,
    }
  },
})
</script>
