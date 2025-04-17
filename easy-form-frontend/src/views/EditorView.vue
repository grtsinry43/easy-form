<script setup lang="ts">
import componentTypes from '@/meta/component-meta.ts'
import { VueDraggable } from 'vue-draggable-plus'
import { ArrowLeft } from '@vicons/carbon'
import { useEditorStore } from '@/stores/editor.ts'
import { NIcon } from 'naive-ui'
import { ref } from 'vue'
import { BookmarkOutline, ListOutline } from '@vicons/ionicons5'

const store = useEditorStore()
const curMenu = ref('items')

const menuOptions = [
  {
    label: '项目',
    key: 'items',
    icon: ListOutline,
  },
  {
    label: '大纲',
    key: 'outline',
    icon: BookmarkOutline,
  },
]
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
        <n-text>
          {{ store.formMeta.title.length === 0 ? '新建表单' : store.formMeta.title }}
        </n-text>
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
        <nav class="h-full overflow-auto">
          <n-layout has-sider class="h-full">
            <n-layout-sider bordered :width="64">
              <n-space vertical class="h-full">
                <div
                  v-for="option in menuOptions"
                  :key="option.key"
                  :class="{
                    'bg-gray-200 dark:bg-gray-700': curMenu === option.key,
                  }"
                  class="flex flex-col p-2 h-16 w-full items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  @click="curMenu = option.key"
                >
                  <n-icon size="18">
                    <component :is="option.icon" />
                  </n-icon>
                  <div class="text-[0.75rem]">{{ option.label }}</div>
                </div>
              </n-space>
            </n-layout-sider>
            <n-layout class="p-4">
              <n-collapse
                arrow-placement="right"
                :default-expanded-names="['select']"
                v-if="curMenu === 'items'"
              >
                <n-collapse-item v-for="type in componentTypes" :key="type.id" :name="type.id">
                  <template #header>
                    <n-icon class="mr-2">
                      <component :is="type.icon" />
                    </n-icon>
                    <div>{{ type.title }}</div>
                  </template>
                  <template #default>
                    <n-flex v-if="type.buttons && type.buttons.length">
                      <vue-draggable group="test" :sort="false" class="flex flex-wrap">
                        <div
                          v-for="btn in type.buttons"
                          :key="btn.id"
                          class="border rounded-sm p-2 m-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-gray-300 dark:border-gray-600"
                        >
                          {{ btn.text }}
                        </div>
                      </vue-draggable>
                    </n-flex>
                  </template>
                </n-collapse-item>
              </n-collapse>
              <span v-else>
                <n-list class="bg-transparent" hoverable clickable>
                  <n-list-item
                    v-for="(item, index) in store.formData"
                    :key="item.id"
                    class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    @click="store.setCurrentEditComponentId(item.id)"
                  >
                    <div class="px-2">{{ index + 1 }}. {{ item.type || '未命名组件' }}</div>
                  </n-list-item>
                </n-list>
              </span>
            </n-layout>
          </n-layout>
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
            <n-scrollbar class="p-8 h-full">
              <vue-draggable group="test" class="flex flex-col gap-1 w-full h-full p-1">
                <n-card
                  v-for="(item, index) in store.formData"
                  :key="item.id"
                  class="mb-4 rounded-md hover:border-green-700 relative transition"
                  hoverable
                  @click="store.setCurrentEditComponentId(item.id)"
                  :style="{
                    borderColor: store.currentEditComponentId === item.id ? '#3b82f6' : '',
                  }"
                >
                  <!-- 添加 n-badge -->
                  <n-badge
                    v-if="store.currentEditComponentId === item.id"
                    value="当前编辑"
                    type="info"
                    processing
                    class="absolute top-2 right-2"
                  />
                  <component
                    :is="item.component"
                    v-bind="item"
                    :serialNum="index + 1"
                    :store="item.value"
                    :key="item.id"
                  />
                </n-card>
              </vue-draggable>
            </n-scrollbar>
          </template>
          <template #2>
            <n-scrollbar class="p-4 h-full overflow-auto">
              <div>
                <div v-if="store.getComponentById(store.currentEditComponentId)">
                  <div
                    v-for="[key, property] in Object.entries(
                      store.getComponentById(store.currentEditComponentId).value,
                    )"
                    :key="key"
                    :class="{
                      'inline-block mb-2 mr-2': [
                        'weight-editor',
                        'italic-editor',
                        'color-editor',
                      ].includes(property.type),
                    }"
                  >
                    <component
                      v-if="property.isShow"
                      :is="property.editComponent"
                      :value="property.value"
                      :configKey="key"
                      :currentValue="property.currentValue"
                    />
                  </div>
                </div>
                <div v-else class="flex justify-center items-center w-full h-full">
                  <div class="opacity-60">在左侧显示组件，开始编辑叭</div>
                </div>
              </div>
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
