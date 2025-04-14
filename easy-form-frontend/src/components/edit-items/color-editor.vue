<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: '#000000',
  },
})

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
</script>

<template>
  <n-color-picker :value="props.value" :swatches="swatches" class="w-10" />
</template>
