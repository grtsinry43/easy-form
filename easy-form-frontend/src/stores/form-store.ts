import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FormSchema } from '../schemas/form-schemas'

export const useFormStore = defineStore('form', () => {
  const formSchemas = ref<FormSchema[]>([])
  const formValues = ref<Record<string, any>>({})
  const currentSchema = ref<FormSchema | null>(null)

  // 添加表单组件
  const addFormComponent = (schema: FormSchema) => {
    formSchemas.value.push(schema)
  }

  // 更新表单组件
  const updateFormComponent = (index: number, schema: FormSchema) => {
    formSchemas.value[index] = schema
  }

  // 删除表单组件
  const removeFormComponent = (index: number) => {
    formSchemas.value.splice(index, 1)
  }

  // 移动表单组件
  const moveFormComponent = (fromIndex: number, toIndex: number) => {
    const [removed] = formSchemas.value.splice(fromIndex, 1)
    formSchemas.value.splice(toIndex, 0, removed)
  }

  // 设置当前编辑的组件
  const setCurrentSchema = (schema: FormSchema | null) => {
    currentSchema.value = schema
  }

  // 更新表单值
  const updateFormValue = (key: string, value: any) => {
    formValues.value[key] = value
  }

  // 重置表单值
  const resetFormValues = () => {
    formValues.value = {}
  }

  // 获取表单值
  const getFormValues = () => {
    return formValues.value
  }

  // 验证表单
  const validateForm = () => {
    const errors: string[] = []
    formSchemas.value.forEach((schema, index) => {
      if (schema.required) {
        const value = formValues.value[`field_${index}`]
        if (value === undefined || value === null || value === '') {
          errors.push(`${schema.label}是必填项`)
        }
      }
    })
    return errors
  }

  return {
    formSchemas,
    formValues,
    currentSchema,
    addFormComponent,
    updateFormComponent,
    removeFormComponent,
    moveFormComponent,
    setCurrentSchema,
    updateFormValue,
    resetFormValues,
    getFormValues,
    validateForm
  }
}) 