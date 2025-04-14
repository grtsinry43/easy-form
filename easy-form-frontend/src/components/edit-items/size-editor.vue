<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
  value: string[]
  currentValue: number
}>()

const options = computed(() =>
  props.value.map((text: string, index: number) => ({
    label: text + 'px',
    value: index,
  })),
)
</script>

<template>
  <n-select class="w-30 mb-2" :value="currentValue" :options="options" placeholder="选择字体大小" />
</template>
