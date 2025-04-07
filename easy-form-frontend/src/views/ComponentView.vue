<script setup lang="ts">
import { ref } from 'vue'

// Component state
const leftPaneContent = ref('左侧内容区域')
const rightPaneContent = ref('右侧内容区域')
</script>

<template>
  <div class="h-[calc(100vh-64px)] w-full">
    <n-split
      direction="horizontal"
      class="h-full w-full"
      :default-size="0.25"
      :resize-trigger-size="4"
      :min="0.20"
      :max="0.35"
    >
      <template #1>
        <div class="p-4 h-full overflow-auto">
          <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-full">
            {{ leftPaneContent }}
          </div>
        </div>
      </template>
      <template #2>
        <n-split
          direction="horizontal"
          class="h-full w-full"
          :default-size="0.7"
          :resize-trigger-size="4"
          :min="0.5"
          :max="1"
        >
          <template #1>
            <div class="p-4 h-full overflow-auto">
              <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-full">
                {{ leftPaneContent }}
              </div>
            </div>
          </template>
          <template #2>
            <div class="p-4 h-full overflow-auto">
              <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-full">
                {{ rightPaneContent }}
              </div>
            </div>
          </template>
        </n-split>
      </template>
      <!--<template #resize-trigger>-->
      <!--  &lt;!&ndash;<div class="bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 w-1 h-full transition-all"></div>&ndash;&gt;-->
      <!--</template>-->
    </n-split>
  </div>
</template>

<style scoped></style>
