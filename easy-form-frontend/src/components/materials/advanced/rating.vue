<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)
</script>

<template>
  <n-h2> 评分</n-h2>
  <n-p> 来一起打个分数</n-p>
  <n-space>
    <n-rate v-model:value="rating" allow-half />
    <div>{{ rating }}</div>
  </n-space>
</template>

<style scoped></style>
