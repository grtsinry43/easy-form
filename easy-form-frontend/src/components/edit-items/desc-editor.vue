<script setup lang="ts">
defineProps({
  value: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <n-space vertical class="mb-2">
    <n-p class="font-bold">题目描述</n-p>
    <n-input :value="value" type="textarea" placeholder="请输入题目描述" />
  </n-space>
</template>
