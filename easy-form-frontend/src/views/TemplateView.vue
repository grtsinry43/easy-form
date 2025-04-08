<template>
  <n-config-provider :theme="theme">
    <n-layout class="layout">
      <!-- 主要内容区域 -->
      <n-layout-content class="content">
        <div class="page-title">
          <h1>EasyForm 零代码表单生成器</h1>
          <p class="subtitle">拖拽组件，快速创建专业表单</p>
        </div>

        <!-- 标签页切换 -->
        <div class="tab-container">
          <n-button type="primary" class="create-btn" @click="createNewForm">
            <template #icon>
              <n-icon>
                <add-outline />
              </n-icon>
            </template>
            创建表单
          </n-button>
          <n-tabs type="line" animated v-model:value="activeTab">
            <n-tab-pane name="all" tab="所有模板" />
            <n-tab-pane name="survey" tab="问卷调查" />
            <n-tab-pane name="registration" tab="注册登记" />
            <n-tab-pane name="feedback" tab="反馈表单" />
            <n-tab-pane name="application" tab="申请表单" />
            <n-tab-pane name="custom" tab="自定义" />
          </n-tabs>
        </div>

        <!-- 模板卡片网格 -->
        <div class="template-grid">
          <div v-for="template in filteredTemplates" :key="template.id" class="template-card">
            <div class="template-header">
              <h3>{{ template.title }}</h3>
            </div>
            <div class="template-preview">
              <div class="template-logo">{{ template.logo }}</div>
            </div>
            <div class="template-description">
              {{ template.description }}
            </div>
            <div class="template-tags">
              <n-tag
                v-for="(tag, index) in template.tags"
                :key="index"
                :type="tag.type"
                size="small"
                class="tag"
              >
                {{ tag.text }}
              </n-tag>
            </div>
            <div class="template-actions">
              <n-tooltip trigger="hover" placement="top">
                <template #trigger>
                  <n-button
                    quaternary
                    circle
                    class="action-btn edit-btn"
                    @click="useTemplate(template)"
                  >
                    <template #icon>
                      <n-icon>
                        <create-outline />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                编辑
              </n-tooltip>
              <n-tooltip trigger="hover" placement="top">
                <template #trigger>
                  <n-button
                    quaternary
                    circle
                    class="action-btn delete-btn"
                    @click="deleteTemplate(template)"
                  >
                    <template #icon>
                      <n-icon>
                        <trash-outline />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                删除
              </n-tooltip>
            </div>
          </div>
        </div>
      </n-layout-content>
    </n-layout>

    <!-- 创建新表单对话框 -->
    <n-modal v-model:show="showCreateModal" preset="dialog" title="创建新表单">
      <template #header>
        <div class="modal-header">
          <n-icon size="24" class="mr-2">
            <document-text-outline />
          </n-icon>
          <span> 创建新表单 </span>
        </div>
      </template>
      <div class="create-form">
        <n-form :model="formModel" label-placement="left" label-width="80">
          <n-form-item label="表单名称" path="title">
            <n-input v-model:value="formModel.title" placeholder="请输入表单名称" />
          </n-form-item>
          <n-form-item label="表单类型" path="type">
            <n-select v-model:value="formModel.type" :options="typeOptions" />
          </n-form-item>
          <n-form-item label="表单描述" path="description">
            <n-input
              v-model:value="formModel.description"
              type="textarea"
              placeholder="请输入表单描述"
            />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div class="modal-footer">
          <n-button @click="showCreateModal = false"> 取消</n-button>
          <n-button type="primary" @click="confirmCreate"> 创建</n-button>
        </div>
      </template>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import {
  DocumentTextOutline,
  // NotificationOutline,
  CreateOutline,
  TrashOutline,
  AddOutline,
} from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

const message = useMessage()
const theme = ref(null) // 可以设置为 darkTheme 或 null (lightTheme)

// 菜单选项
const activeKey = ref('templates')
const menuOptions = [
  {
    label: '首页',
    key: 'home',
    icon: () => h('i', { class: 'icon-home' }),
  },
  {
    label: '模板',
    key: 'templates',
    icon: () => h('i', { class: 'icon-templates' }),
  },
  {
    label: '表单',
    key: 'forms',
    icon: () => h('i', { class: 'icon-forms' }),
  },
  {
    label: '数据',
    key: 'data',
    icon: () => h('i', { class: 'icon-data' }),
  },
]

// 标签页
const activeTab = ref('all')

// 模板数据
const templates = ref([
  {
    id: 1,
    title: '客户满意度调查',
    logo: '01 SURVEY',
    type: 'survey',
    description: '收集客户对产品或服务的反馈和满意度评价',
    tags: [
      { text: '满意度', type: 'default' },
      { text: '评分', type: 'success' },
      { text: '客户反馈', type: 'warning' },
      { text: '产品体验', type: 'error' },
      { text: '服务质量', type: 'info' },
    ],
  },
  {
    id: 2,
    title: '活动报名表',
    logo: '02 EVENT',
    type: 'registration',
    description: '用于活动、会议、培训等场景的报名登记',
    tags: [
      { text: '活动', type: 'default' },
      { text: '报名', type: 'success' },
      { text: '联系信息', type: 'warning' },
      { text: '参与者', type: 'error' },
      { text: '时间安排', type: 'info' },
    ],
  },
  {
    id: 3,
    title: '产品反馈表',
    logo: '03 FEED',
    type: 'feedback',
    description: '收集用户对产品功能、体验的反馈和建议',
    tags: [
      { text: '产品', type: 'default' },
      { text: '反馈', type: 'success' },
      { text: '功能评价', type: 'warning' },
      { text: '用户体验', type: 'error' },
      { text: '改进建议', type: 'info' },
    ],
  },
  {
    id: 4,
    title: '员工入职登记',
    logo: '04 STAFF',
    type: 'registration',
    description: '新员工入职信息采集和登记表单',
    tags: [
      { text: '入职', type: 'default' },
      { text: '人事', type: 'success' },
      { text: '员工信息', type: 'warning' },
      { text: '个人资料', type: 'error' },
      { text: '联系方式', type: 'info' },
    ],
  },
  {
    id: 5,
    title: '课程评价表',
    logo: '05 COURSE',
    type: 'feedback',
    description: '学生对课程内容、教师的评价反馈表',
    tags: [
      { text: '课程', type: 'default' },
      { text: '评价', type: 'success' },
      { text: '教学质量', type: 'warning' },
      { text: '学习体验', type: 'error' },
      { text: '改进建议', type: 'info' },
    ],
  },
  {
    id: 6,
    title: '项目申请表',
    logo: '06 PROJ',
    type: 'application',
    description: '用于项目立项、资源申请的表单',
    tags: [
      { text: '项目', type: 'default' },
      { text: '申请', type: 'success' },
      { text: '资源需求', type: 'warning' },
      { text: '预算规划', type: 'error' },
      { text: '时间节点', type: 'info' },
    ],
  },
  {
    id: 7,
    title: '会议室预订',
    logo: '07 ROOM',
    type: 'application',
    description: '会议室预订申请和使用登记表单',
    tags: [
      { text: '会议室', type: 'default' },
      { text: '预订', type: 'success' },
      { text: '时间段', type: 'warning' },
      { text: '使用人数', type: 'error' },
      { text: '设备需求', type: 'info' },
    ],
  },
  {
    id: 8,
    title: '自定义问卷',
    logo: '08 CUSTOM',
    type: 'custom',
    description: '完全自定义的空白问卷模板',
    tags: [
      { text: '自定义', type: 'default' },
      { text: '灵活', type: 'success' },
      { text: '可扩展', type: 'warning' },
      { text: '多用途', type: 'error' },
      { text: '个性化', type: 'info' },
    ],
  },
])

// 根据当前标签页过滤模板
const filteredTemplates = computed(() => {
  if (activeTab.value === 'all') {
    return templates.value
  } else {
    return templates.value.filter((template) => template.type === activeTab.value)
  }
})

// 创建表单相关
const showCreateModal = ref(false)
const formModel = ref({
  title: '',
  type: 'custom',
  description: '',
})

const typeOptions = [
  { label: '问卷调查', value: 'survey' },
  { label: '注册登记', value: 'registration' },
  { label: '反馈表单', value: 'feedback' },
  { label: '申请表单', value: 'application' },
  { label: '自定义', value: 'custom' },
]

// 创建新表单
function createNewForm() {
  formModel.value = {
    title: '',
    type: 'custom',
    description: '',
  }
  showCreateModal.value = true
}

// 确认创建
function confirmCreate() {
  if (!formModel.value.title) {
    message.error('请输入表单名称')
    return
  }

  // 创建新模板
  const newTemplate = {
    id: templates.value.length + 1,
    title: formModel.value.title,
    logo: `${String(templates.value.length + 1).padStart(2, '0')} NEW`,
    type: formModel.value.type,
    description: formModel.value.description || '暂无描述',
    tags: [
      { text: '新建', type: 'default' },
      { text: formModel.value.type, type: 'success' },
    ],
  }

  templates.value.push(newTemplate)
  showCreateModal.value = false
  message.success('创建成功，即将进入编辑器')

  // 这里可以添加跳转到表单编辑器的逻辑
  setTimeout(() => {
    // 模拟跳转
    console.log('跳转到表单编辑器，编辑模板:', newTemplate)
  }, 1000)
}

// 使用模板
function useTemplate(template) {
  message.success(` 已选择模板：${template.title}，即将进入编辑器 `)
  // 这里可以添加跳转到表单编辑器的逻辑，并加载选中的模板
  console.log('使用模板:', template)
}

// 删除模板
function deleteTemplate(template) {
  // 实际应用中应该添加确认对话框
  const index = templates.value.findIndex((t) => t.id === template.id)
  if (index !== -1) {
    templates.value.splice(index, 1)
    message.success('删除成功')
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-right: 40px;
  cursor: pointer;
}

.logo-icon {
  margin-right: 8px;
  color: #18a058;
}

.login-btn {
  margin: 0 16px;
}

.content {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  margin: 20px 0 40px;
}

.subtitle {
  color: #666;
  margin-top: 8px;
}

.tab-container {
  position: relative;
  margin-bottom: 24px;
}

.create-btn {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 16px;
}

.template-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.template-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.template-header {
  margin-bottom: 16px;
}

.template-preview {
  margin: 16px 0;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 6px;
}

.template-logo {
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -1px;
  color: #333;
}

.template-description {
  color: #666;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
  flex-grow: 1;
}

.template-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  margin-right: 4px;
  margin-bottom: 4px;
}

.template-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.action-btn {
  background-color: #f5f5f5;
}

.edit-btn {
  color: #2080f0;
}

.delete-btn {
  color: #d03050;
}

.modal-header {
  display: flex;
  align-items: center;
}

.create-form {
  padding: 16px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
