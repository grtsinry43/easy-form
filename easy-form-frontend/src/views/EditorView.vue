<script setup lang="ts">
import componentTypes from '@/meta/component-meta.ts'
import { useRouter, useRoute } from 'vue-router'
import { useMaterialStore } from '@/stores/material-components.ts'
import EditPanel from '@/components/edit/EditPanel.vue'
import type { ComponentValueMap } from '@/configs/initialValue/initialValueMap.ts'
import { VueDraggable } from 'vue-draggable-plus'
import { ArrowLeft, Save } from '@vicons/carbon'
import { CloudSyncRound } from '@vicons/material'

const route = useRoute()

const router = useRouter()

const store = useMaterialStore()

const navigateToComponent = (typeId: string, buttonId: keyof ComponentValueMap) => {
  router.push(`/components/${typeId}/${String(buttonId)}`)
}
</script>

<template>
  <div class="h-[calc(100vh-64px-48px)] w-full">
    <n-space
      justify="space-between"
      class="h-12 border flex items-center border-black/20 dark:border-white/20 px-4 relative"
    >
      <n-button text>
        <n-icon class="mr-2">
          <ArrowLeft />
        </n-icon>
        退出编辑
      </n-button>
      <n-space class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <n-text> 表单名字，至少假装是的</n-text>
        <!--<div>-->
        <!--  <n-icon class="opacity-50" style="vertical-align: -1px">-->
        <!--    <Save />-->
        <!--  </n-icon>-->
        <!--  <n-icon class="opacity-50" style="vertical-align: -1px">-->
        <!--    <CloudSyncRound />-->
        <!--  </n-icon>-->
        <!--</div>-->
      </n-space>
      <n-space>
        <n-button secondary> 保存表单</n-button>
        <n-button type="info" secondary> 预览表单</n-button>
        <n-button type="success" secondary> 发布表单</n-button>
      </n-space>
    </n-space>
    <n-split
      direction="horizontal"
      class="h-full w-full"
      :default-size="0.25"
      :resize-trigger-size="2"
      :min="0.2"
      :max="0.35"
    >
      <template #1>
        <nav class="p-4 h-full overflow-auto">
          <n-collapse arrow-placement="right" :default-expanded-names="['select']">
            <n-collapse-item v-for="type in componentTypes" :key="type.id" :name="type.id">
              <template #header>
                <n-icon class="mr-2">
                  <component :is="type.icon" />
                </n-icon>
                <div>{{ type.title }}</div>
              </template>
              <template #default>
                <n-flex v-if="type.buttons && type.buttons.length">
                  <vue-draggable group="test">
                    <n-button v-for="btn in type.buttons" :key="btn.id">
                      {{ btn.text }}
                    </n-button>
                  </vue-draggable>
                </n-flex>
              </template>
            </n-collapse-item>
          </n-collapse>
        </nav>
      </template>
      <template #2>
        <n-split
          direction="horizontal"
          class="h-full w-full"
          :default-size="0.7"
          :resize-trigger-size="2"
          :min="0.5"
          :max="1"
        >
          <template #1>
            <div class="p-8 h-full overflow-auto">
              <vue-draggable group="test" class="flex flex-col gap-4 w-full h-full">
              </vue-draggable>
            </div>
          </template>
          <template #2>
            <n-scrollbar class="p-4 h-full overflow-auto">
              <EditPanel />
            </n-scrollbar>
          </template>
        </n-split>
      </template>
      <!--<template #resize-trigger>-->
      <!--  &lt;!&ndash;<div class="bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 w-1 h-full transition-all"></div>&ndash;&gt;-->
      <!--</template>-->
    </n-split>
  </div>
</template>

<style>
.nested-transition-enter-active,
.nested-transition-leave-active {
  transition: all 0.2s ease;
}

.nested-transition-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.nested-transition-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
