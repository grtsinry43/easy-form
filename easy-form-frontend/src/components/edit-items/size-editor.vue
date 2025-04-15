<script setup lang="ts">
import { defineProps, computed, inject } from 'vue'

const props = defineProps<{
  value: string[]
  currentValue: number
  configKey: string
}>()

const updateVal = inject('updateVal') as ((key: string, value: number) => void) | undefined

const options = computed(() =>
  props.value.map((text: string, index: number) => ({
    label: text + 'px',
    value: index,
  })),
)

const handleChange = (value: number) => {
  if (updateVal) {
    updateVal(props.configKey, value)
  }
}
</script>

<template>
  <n-select
    class="w-30 mb-2"
    :value="currentValue"
    :options="options"
    placeholder="选择字体大小"
    @update:value="handleChange"
  />
</template>
