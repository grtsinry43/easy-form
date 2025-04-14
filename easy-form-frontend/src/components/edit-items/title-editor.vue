<script setup lang="ts">
defineProps({
  value: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <n-space vertical class="mb-2 w-full">
    <n-p class="font-bold">题目标题</n-p>
    <n-input :value="value" type="text" placeholder="请输入题目标题" />
  </n-space>
</template>
