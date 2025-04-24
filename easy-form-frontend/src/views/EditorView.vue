<script setup lang="ts">
import { ref, onMounted, provide, onBeforeUnmount, nextTick, computed } from 'vue' // 引入 computed
import { useRoute, useRouter } from 'vue-router'
import { NIcon, NScrollbar, useMessage, useDialog } from 'naive-ui' // 引入 NScrollbar 类型
// 尝试从 vue-draggable-plus 导入类型，如果不存在，则使用自定义接口
import { VueDraggable } from 'vue-draggable-plus'
import { ArrowLeft } from '@vicons/carbon'
import { BookmarkOutline, ListOutline } from '@vicons/ionicons5'
import { DeleteTwotone } from '@vicons/material'
import componentTypes from '@/meta/component-meta.ts'
import { useEditorStore } from '@/stores/editor.ts'
import { getFormById, updateForm } from '@/api/form.ts'
import { type ComponentValueMap, initialValueMap } from '@/configs/initialValue/initialValueMap.ts'
import type { ComponentProperty } from '@/types/material.ts' // 引入 ComponentProperty 和 BaseComponentType
import eventBus from '@/utils/eventBus.ts'
import type { VueComponentType } from '@/types/common.ts'

// 1. 定义 API 返回类型
export interface FormDetail {
  id: string
  title: string
  description: string
  type: string
  cover: string
  value: string // value 是 formData 的 JSON 字符串
}

// 2. 定义 Draggable 事件类型 (如果库未导出或不精确)
interface DraggableSortEvent {
  oldIndex: number
  newIndex: number
}

const route = useRoute()
const router = useRouter()
const message = useMessage()
const dialog = useDialog()

// 确保 ID 是字符串
const id: string = Array.isArray(route.params.id) ? route.params.id[0] : (route.params.id as string)

const store = useEditorStore()
const draggableKey = ref(0) // 用于强制刷新 Draggable
const curMenu = ref('items')
// 4. 为 Ref 添加类型
const scrollAreaRef = ref<InstanceType<typeof NScrollbar> | null>(null)
// 7. 使用 number 类型
let autoSaveInterval: number | null = null

onMounted(async () => {
  try {
    const form: FormDetail | null = await getFormById(id)
    if (form) {
      store.initEditorData({
        id: form.id,
        title: form.title,
        description: form.description,
        type: form.type,
        cover: form.cover,
        value: form.value,
      })
    } else {
      message.error(`表单 ID "${id}" 未找到。`)
      router.push({ name: 'not-found' })
    }
  } catch (error) {
    console.error('获取表单数据时出错:', error)
    message.error('加载表单数据失败。')
    // 可以考虑跳转到错误页或主页
    // router.push({ name: 'home' });
  }

  // --- AutoSave 和 EventBus 设置 ---
  window.addEventListener('blur', () => saveFormHandle(false)) // 考虑防抖
  autoSaveInterval = setInterval(() => saveFormHandle(false), 30000) // 30秒自动保存
  eventBus.on('addComponent', scrollToBottom)
})

onBeforeUnmount(() => {
  // 清理
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
  }
  window.removeEventListener('blur', () => saveFormHandle(false))
  eventBus.off('addComponent', scrollToBottom)
})

// 滚动到底部逻辑
const scrollToBottom = () => {
  nextTick(() => {
    if (scrollAreaRef.value) {
      // 尝试获取滚动内容元素并滚动
      const contentEl = scrollAreaRef.value.$el?.querySelector('.n-scrollbar-content')
      if (contentEl) {
        // 使用 scrollHeight 滚动到底部
        contentEl.scrollTo({ top: contentEl.scrollHeight, behavior: 'smooth' })
      }
    }
  })
}

// 提供给子组件的更新方法
provide('updateVal', (configKey: string, newVal: string | number | string[] | number[]) => {
  store.updateComponentInFormData(configKey, newVal)
})

// 保存表单逻辑
const saveFormHandle = async (msg: boolean = false) => {
  // 可以在这里添加加载状态
  try {
    const res = await updateForm({
      id,
      meta: store.formMeta,
      data: store.formData, // 确保 store.formData 是 API 期望的格式
    })
    if (res) {
      // 减少频繁的成功提示，尤其是在自动保存时
      if (msg) message.success('保存成功')
      console.log('表单已自动保存')
    } else {
      message.error('保存失败，请检查网络或稍后重试')
    }
  } catch (error) {
    console.error('保存表单时出错:', error)
    message.error('保存表单时发生错误')
  } finally {
    // 结束加载状态
  }
}

// 菜单选项
const menuOptions: Array<{ label: string; key: string; icon: VueComponentType }> = [
  { label: '项目', key: 'items', icon: ListOutline },
  { label: '大纲', key: 'outline', icon: BookmarkOutline },
]

// 排序处理
const handleSort = (event: DraggableSortEvent): void => {
  console.log('Sort event:', event)
  store.reorderFormDataByIndex(event.oldIndex, event.newIndex)
  // 强制刷新 Draggable key (如果 store 更新后列表渲染不正确时使用)
  // draggableKey.value += 1;
}

function isComponentValueMapKey(key: string): key is keyof ComponentValueMap {
  return key in initialValueMap
}

// 拖拽添加处理
const handleAdd = (event: {
  newIndex?: number
  clonedData?: {
    id: string
    text: string
  }
}): void => {
  console.log('Add event:', event)
  const newIndex = event.newIndex

  if (event.clonedData && typeof newIndex === 'number') {
    const componentId = event.clonedData.id
    if (componentId && store.formData.length >= newIndex && isComponentValueMapKey(componentId)) {
      // 检查 id 和索引有效性
      store.addComponentAtIndex(newIndex, componentId)
      message.success(`组件已添加到位置 ${newIndex + 1}`)
    } else {
      console.error('无法添加组件，无效的组件 ID 或索引:', componentId, newIndex)
    }
  } else {
    console.error('无效的添加事件数据:', event)
  }
}

// 删除组件处理
const deleteComponentHandle = (componentId: string, title: string | undefined) => {
  // 3. 使用可选链和提供默认值
  const displayTitle = title ?? '未命名组件'
  dialog.warning({
    title: `删除组件 "${displayTitle}"`,
    content: '确定要删除该组件吗？此操作不可撤销。',
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: () => {
      store.removeComponent(componentId)
      if (store.currentEditComponentId === componentId) {
        // 6. 使用 '' 重置
        store.setCurrentEditComponentId('')
      }
      message.success(`组件 "${displayTitle}" 已删除`)
    },
  })
}

// 5. 计算属性来获取当前编辑组件的属性列表 (类型安全)
const currentEditProperties = computed(() => {
  const component = store.getComponentById(store.currentEditComponentId)
  if (!component || !component.value) {
    return []
  }
  // 明确条目类型为 [string, ComponentProperty]
  return Object.entries(component.value) as [string, ComponentProperty][]
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
        <n-button secondary @click="saveFormHandle(true)"> 保存表单</n-button>
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
                              store.setCurrentEditComponentId('')
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
                <div v-if="store.currentEditComponentId && currentEditProperties.length > 0">
                  <div
                    v-for="[key, property] in currentEditProperties"
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
                  <div class="opacity-60">在左侧选择一个组件开始编辑叭</div>
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
