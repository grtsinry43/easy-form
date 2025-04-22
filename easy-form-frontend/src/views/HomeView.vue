<script setup lang="ts">
import { Delete24Regular, DocumentEdit20Regular } from '@vicons/fluent'
import { useRouter } from 'vue-router'
import { useMessage, useDialog } from 'naive-ui'
import { onMounted, ref, reactive } from 'vue'
import { getAllForms, createForm } from '@/api/form.ts'

const message = useMessage()
const dialog = useDialog()
const router = useRouter()
const forms = ref([])
const showCreateModal = ref(false)

// 表单创建信息
const formInfo = reactive({
  title: '',
  description: '',
  type: '问卷',
})

// 表单类型选项
const formTypeOptions = [
  { label: '问卷', value: 'form' },
  // { label: '投票', value: '投票' },
  // { label: '报名', value: '报名' },
]

// 表单规则
const rules = {
  title: {
    required: true,
    message: '请输入表单标题',
    trigger: 'blur',
  },
  description: {
    required: true,
    message: '请输入表单描述',
    trigger: 'blur',
  },
}

onMounted(async () => {
  message.success('欢迎使用 EasyForm 零代码表单生成器，正在加载数据...')
  try {
    forms.value = await getAllForms()
    console.log('allForms', forms.value)
  } catch (error) {
    message.error('加载数据失败')
    console.error(error)
  }
})

// 创建表单
const handleCreateForm = async (e) => {
  e.preventDefault()

  try {
    const res = await createForm({
      title: formInfo.title,
      description: formInfo.description,
      type: formInfo.type,
    })

    message.success('创建表单成功')
    showCreateModal.value = false

    // 重置表单
    formInfo.title = ''
    formInfo.description = ''
    formInfo.type = 'form'

    // 刷新表单列表
    forms.value = await getAllForms()

    // 可选：直接跳转到编辑页面
    if (res) {
      message.success('创建成功，正在跳转到编辑页面')
      router.push(`/edit/${res}`)
    }
  } catch (error) {
    message.error('创建表单失败')
    console.error(error)
  }
}

// 删除表单
const handleDeleteForm = (id) => {
  dialog.warning({
    title: '确认删除',
    content: '确定要删除这个表单吗？此操作不可撤销。',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      // 这里添加删除表单的 API 调用
      message.success('删除成功')
    },
  })
}
</script>

<template>
  <main class="mt-8">
    <n-h1 class="text-center w-full">EasyForm 零代码表单生成器</n-h1>
    <div class="flex m-8">
      <n-button type="success" class="mr-4" @click="showCreateModal = true"> 创建表单</n-button>
      <n-button type="default"> 所有表单</n-button>
    </div>
    <div class="grid grid-cols-4 m-8 gap-6">
      <n-card v-for="form in forms" :key="form.id" :title="form.title" hoverable>
        <n-image
          width="100"
          :src="form.coverImage || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'"
        />
        <div class="mt-4">{{ form.description }}</div>
        <n-space class="mt-4">
          <n-tag :bordered="false" type="info">{{ form.type }}</n-tag>
        </n-space>
        <n-space class="mt-4 flex" justify="end">
          <n-button
            strong
            secondary
            circle
            type="info"
            @click="
              () => {
                message.success('开始编辑，正在初始化编辑器')
                router.push(`/edit/${form.id}`)
              }
            "
          >
            <template #icon>
              <n-icon>
                <DocumentEdit20Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error" @click="handleDeleteForm(form.id)">
            <template #icon>
              <n-icon>
                <Delete24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>

      <!-- 未找到数据时显示 -->
      <n-empty v-if="forms.length === 0" description="暂无表单数据" />
    </div>

    <!-- 创建表单的弹窗 -->
    <n-modal v-model:show="showCreateModal" preset="card" title="创建新表单" style="width: 500px">
      <n-form
        ref="formRef"
        :model="formInfo"
        :rules="rules"
        label-placement="left"
        label-width="80"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="表单标题" path="title">
          <n-input v-model:value="formInfo.title" placeholder="请输入表单标题" />
        </n-form-item>

        <n-form-item label="表单描述" path="description">
          <n-input
            v-model:value="formInfo.description"
            type="textarea"
            placeholder="请输入表单描述"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </n-form-item>

        <n-form-item label="表单类型" path="type">
          <n-select
            v-model:value="formInfo.type"
            :options="formTypeOptions"
            placeholder="请选择表单类型"
          />
        </n-form-item>

        <div class="flex justify-end">
          <n-button class="mr-4" @click="showCreateModal = false"> 取消</n-button>
          <n-button type="primary" @click="handleCreateForm"> 创建</n-button>
        </div>
      </n-form>
    </n-modal>
  </main>
</template>
