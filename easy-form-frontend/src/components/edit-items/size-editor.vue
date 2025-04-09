<template>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" placeholder="选择字体大小" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('16')
    const options = [
      { label: '大 (22px)', value: '22' },
      { label: '中 (20px)', value: '20' },
      { label: '小 (18px)', value: '18' },
      { label: '默认 (16px)', value: '16' },
      { label: '小 (14px)', value: '14' },
      { label: '更小 (12px)', value: '12' },
    ]

    return {
      value,
      options,
    }
  },
})
</script>
