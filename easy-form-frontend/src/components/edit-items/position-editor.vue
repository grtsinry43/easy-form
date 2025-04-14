<script setup lang="ts">
defineProps({
  value: {
    type: Array<string>,
    default: ['left', 'center'],
  },
  currentValue: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <n-space vertical>
    <n-p class="font-bold">题目对齐方式</n-p>
    <n-radio-group :value="currentValue">
      <n-radio-button
        v-for="option in value"
        :key="option"
        :value="value.indexOf(option)"
        :label="option"
      />
    </n-radio-group>
  </n-space>
</template>
