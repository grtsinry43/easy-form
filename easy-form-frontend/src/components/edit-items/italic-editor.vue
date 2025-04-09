<template>
  <n-space vertical>
    <n-radio-group v-model:value="value">
      <n-radio v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </n-radio>
    </n-radio-group>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(1)
    const options = [
      { label: '斜体', value: 0 },
      { label: '正常', value: 1 },
    ]

    return {
      value,
      options,
    }
  },
})
</script>
