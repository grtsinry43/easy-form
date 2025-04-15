<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps({
  value: {
    type: Array<string>,
    default: ['left', 'center'],
  },
  currentValue: {
    type: Number,
    default: 0,
  },
  configKey: {
    type: String,
    required: true
  }
})

const updateVal = inject('updateVal') as ((key: string, value: number) => void) | undefined

const handleChange = (value: number) => {
  if (updateVal) {
    updateVal(props.configKey, value)
  }
}
</script>

<template>
  <n-space vertical>
    <n-p class="font-bold">题目对齐方式</n-p>
    <n-radio-group :value="currentValue" @update:value="handleChange">
      <n-radio-button
        v-for="option in value"
        :key="option"
        :value="value.indexOf(option)"
        :label="option"
      />
    </n-radio-group>
  </n-space>
</template>
