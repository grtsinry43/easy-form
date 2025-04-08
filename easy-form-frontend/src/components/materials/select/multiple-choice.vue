<script setup lang="ts">
import { ref } from 'vue'

const checkboxGroupValue = ref<string[]>([])
</script>

<template>
  <n-h2>选择题默认标题</n-h2>
  <n-p> 不想做选择，我全都要！ </n-p>
  <n-checkbox-group v-model:value="checkboxGroupValue">
    <n-space>
      <n-checkbox value="Option 1"> 选项1</n-checkbox>
      <n-checkbox value="Option 2"> 选项2</n-checkbox>
      <n-checkbox value="Option 3"> 选项3</n-checkbox>
    </n-space>
  </n-checkbox-group>
</template>

<style scoped></style>
