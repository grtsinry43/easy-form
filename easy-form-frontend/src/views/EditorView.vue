<script setup lang="ts">
import componentTypes from '@/meta/component-meta.ts'
import { VueDraggable } from 'vue-draggable-plus'
import { ArrowLeft } from '@vicons/carbon'
import { useEditorStore } from '@/stores/editor.ts'
import { NIcon, useMessage, useDialog } from 'naive-ui'
import { onMounted, provide, ref, onBeforeUnmount, nextTick } from 'vue'
import { BookmarkOutline, ListOutline } from '@vicons/ionicons5'
import { DeleteTwotone } from '@vicons/material'
import { createForm, getFormById, updateForm } from '@/api/form.ts'
import { useRoute, useRouter } from 'vue-router'
import type { ComponentValueMap } from '@/configs/initialValue/initialValueMap.ts'
import eventBus from '@/utils/eventBus.ts'

const route = useRoute()
const router = useRouter()

const message = useMessage()

const dialog = useDialog()

const id = route.params.id as string

onMounted(async () => {
  const form = await getFormById(id)
  console.log('form', form)
  if (form) {
    store.initEditorData(form)
  } else {
    router.push({ name: 'not-found' })
  }
})

const draggableKey = ref(0) // 创建一个响应式 key

const store = useEditorStore()
const curMenu = ref('items')

provide('updateVal', (configKey: string, newVal: string | number | string[] | number[]) => {
  store.updateComponentInFormData(configKey, newVal)
})

const saveFormHandle = async () => {
  const res = await updateForm({
    id,
    meta: store.formMeta,
    data: store.formData,
  })
  console.log('保存结果', res)
  if (res) {
    message.success('保存成功')
  } else {
    message.error('保存出现了问题 :(，请尝试重新保存')
  }
}

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

// 自定义排序处理逻辑
const handleSort = (event): void => {
  console.log(event)
  const { oldIndex, newIndex } = event
  console.log('排序:', oldIndex, newIndex)
  store.reorderFormDataByIndex(oldIndex, newIndex)
  console.log('排序完成:', store.formData)
  // 更新 draggableKey 以触发重新渲染
  draggableKey.value += 1
}

// 自定义拖入处理逻辑
const handleAdd = (event) => {
  const { newIndex, data } = event
  store.addComponentAtIndex(newIndex, data.id)
}

const deleteComponentHandle = (id: string, title: string) => {
  dialog.warning({
    title: ` 删除组件"${title}"`,
    content: '确定要删除该组件吗？这个操作不可撤销。',
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: () => {
      store.removeComponent(id)
      message.success('删除成功')
    },
  })
}

const scrollAreaRef = ref(null)

let autoSaveInterval: NodeJS.Timeout | null = null

onMounted(() => {
  // 当窗口失焦触发自动保存
  window.addEventListener('blur', () => {
    saveFormHandle()
  })
  // 每 30 秒自动保存一次
  autoSaveInterval = setInterval(() => {
    saveFormHandle()
  }, 30000)

  eventBus.on('addComponent', () => {
    nextTick(() => {
      if (scrollAreaRef.value) {
        // 直接滚动一个大距离，效果等同于滚动到底部
        scrollAreaRef.value.scrollBy({
          top: 1000000,
          behavior: 'smooth',
        })
      }
    })
  })
})

onBeforeUnmount(() => {
  // 清除定时器
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
  }
  // 移除事件监听器
  window.removeEventListener('blur', saveFormHandle)
})
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
        <n-button secondary @click="saveFormHandle"> 保存表单</n-button>
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
                      <vue-draggable
                        :group="{ name: 'test', pull: 'clone', put: false }"
                        :sort="false"
                        class="flex flex-wrap"
                        :model-value="type.buttons"
                      >
                        <div
                          v-for="btn in type.buttons"
                          @click="
                            () => {
                              store.addComponentToFormData(btn.id as keyof ComponentValueMap)
                              store.setCurrentEditComponentId(null)
                              message.success('组件' + btn.text + '添加成功')
                            }
                          "
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
              <n-scrollbar class="h-full" v-else>
                <n-list class="bg-transparent" hoverable clickable>
                  <n-list-item
                    v-for="(item, index) in store.formData"
                    :key="item.id"
                    class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    @click="store.setCurrentEditComponentId(item.id)"
                  >
                    <div class="px-2">
                      {{ index + 1 }}. {{ item.value.title.value || '未命名组件' }}
                    </div>
                  </n-list-item>
                </n-list>
              </n-scrollbar>
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
            <n-scrollbar class="p-8 h-full" ref="scrollAreaRef">
              <vue-draggable
                :group="{ name: 'test', pull: false, put: true }"
                class="flex flex-col gap-1 w-full h-full p-1"
                :model-value="store.formData"
                @add="handleAdd"
                @update="handleSort"
                :key="draggableKey"
              >
                <n-card
                  v-for="(item, index) in store.formData"
                  :key="item.id"
                  class="mb-4 rounded-md hover:border-green-700 relative transition card-container"
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
                  <!-- 删除按钮 -->
                  <n-button
                    type="error"
                    class="absolute top-0 right-0 z-10 delete-btn rounded-md"
                    secondary
                    @click.stop="deleteComponentHandle(item.id, item.value.title.value)"
                    size="tiny"
                  >
                    <template #icon>
                      <n-icon>
                        <DeleteTwotone />
                      </n-icon>
                    </template>
                  </n-button>
                  <component
                    :is="item.component"
                    :serialNum="index + 1"
                    :value="item.value"
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
                      store.getComponentById(store.currentEditComponentId)?.value || {},
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
    </n-split>
  </div>
</template>

<style scoped>
.delete-btn {
  display: none;
}

.card-container:hover .delete-btn {
  display: inline-flex;
}
</style>
