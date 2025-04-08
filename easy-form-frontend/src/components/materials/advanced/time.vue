<template>
  <n-h2> 日期时间选择</n-h2>
  <n-p> 那就看看你会遇到哪一天吧</n-p>
  <n-date-picker v-model:value="timestamp" type="datetime" clearable />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      timestamp: ref(1744041600000),
    }
  },
})
</script>

<style scoped></style>
