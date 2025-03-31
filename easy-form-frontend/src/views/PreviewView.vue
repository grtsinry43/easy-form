<script setup lang="ts">
import { useFormStore } from '../stores/form-store'
import { useMessage } from 'naive-ui'
import InputComponent from '../components/survey-coms/InputComponent.vue'
import SelectComponent from '../components/survey-coms/SelectComponent.vue'
import DateComponent from '../components/survey-coms/DateComponent.vue'
import NumberComponent from '../components/survey-coms/NumberComponent.vue'
import TextareaComponent from '../components/survey-coms/TextareaComponent.vue'
import SwitchComponent from '../components/survey-coms/SwitchComponent.vue'
import RateComponent from '../components/survey-coms/RateComponent.vue'
import UploadComponent from '../components/survey-coms/UploadComponent.vue'

const formStore = useFormStore()
const message = useMessage()

const componentMap = {
  input: InputComponent,
  select: SelectComponent,
  date: DateComponent,
  number: NumberComponent,
  textarea: TextareaComponent,
  switch: SwitchComponent,
  rate: RateComponent,
  upload: UploadComponent
}

const handleValueChange = (index: number, value: any) => {
  formStore.updateFormValue(`field_${index}`, value)
}

const handleSubmit = () => {
  const errors = formStore.validateForm()
  if (errors.length > 0) {
    message.error(errors.join('\n'))
    return
  }
  
  const values = formStore.getFormValues()
  console.log('表单数据：', values)
  message.success('提交成功！')
}

const handleReset = () => {
  formStore.resetFormValues()
  message.success('重置成功！')
}
</script>

<template>
  <div class="w-full max-w-3xl mx-auto p-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold mb-6 text-center">表单预览</h2>
      
      <div class="space-y-6">
        <template v-for="(schema, index) in formStore.formSchemas" :key="index">
          <component
            :is="componentMap[schema.type]"
            v-bind="schema"
            @update:value="(value) => handleValueChange(index, value)"
          />
        </template>
      </div>

      <div class="flex justify-center space-x-4 mt-8">
        <n-button type="primary" @click="handleSubmit">
          提交
        </n-button>
        <n-button @click="handleReset">
          重置
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style> 