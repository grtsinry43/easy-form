<script setup lang="ts">

</script>

<template>
  <n-p class="text-sm text-gray-500 dark:text-gray-400">
    还有要补充的吗，放一张海报也许是个不错的选择
  </n-p>
  <n-image src="https://vuejs.org/images/logo.png" class="h-64 w-full">
    <template #placeholder>
      <n-skeleton :loading="true" class="w-full h-64" />
    </template>
  </n-image>
</template>

<style scoped>

</style>
