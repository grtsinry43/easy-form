// 当前的编辑器表单实时状态仓库
import { defineStore } from 'pinia'
import { initialValueMap } from '@/configs/initialValue/initialValueMap.ts'
import type { ComponentValue } from '@/stores/material-components.ts'

export const useEditorStore = defineStore('editorStore', {
  state: () => ({
    currentEditComponentId: '', // 当前正在编辑的组件 ID
    formMeta: {
      title: '', // 表单标题
      description: '', // 表单描述
      coverImage: '', // 表单封面图片
      formId: '', // 表单 ID
      formType: 'form', // 表单类型，默认为 'form'
    },
    formData: [
      // 表单数据，包含每个组件的 schema 信息
      initialValueMap['single-choice'](),
      initialValueMap['single-line'](),
      initialValueMap['multi-line'](),
      initialValueMap['text-remark'](),
      initialValueMap['image-remark'](),
      initialValueMap['rating'](),
      initialValueMap['time'](),
      initialValueMap['dropdown'](),
      initialValueMap['multiple-choice'](),
      initialValueMap['image-single'](),
      initialValueMap['image-multiple'](),
    ],
  }),
  actions: {
    // 设置当前正在编辑的组件 ID
    setCurrentEditComponentId(id) {
      console.log('setCurrentEditComponentId', id)
      this.currentEditComponentId = id
    },
    // 设置表单元数据
    setFormMeta(meta) {
      this.formMeta = { ...this.formMeta, ...meta }
    },
    // 添加组件到表单数据
    addComponentToFormData(component) {
      this.formData.push(component)
    },
    // 更新组件在表单数据中的状态
    updateComponentInFormData(configKey: string, newVal: string | number | string[] | number[]) {
      console.log('updateComponentInFormData', configKey, newVal)
      const component = this.formData.find(
        (component) => component.id === this.currentEditComponentId,
      )
      console.log('component', component)
      if (!component) return
      // 检查 key 是否存在于当前组件的 value 中
      if (configKey in component.value) {
        // 如果 value 是基础类型，直接更新值
        if (typeof newVal !== 'undefined') {
          // 使用类型断言确保 TypeScript 不会报错
          const componentValue = component.value as Record<string, ComponentValue>

          // 根据属性类型判断如何更新
          if ('currentValue' in componentValue[configKey] && typeof newVal === 'number') {
            // 如果属性有 currentValue 并且传入的是数字，更新 currentValue
            componentValue[configKey].currentValue = newVal
          } else {
            // 否则直接更新 value
            componentValue[configKey].value = newVal as string | number | string[] | number[]
          }
        }
      }
    },
    // 删除组件从表单数据
    removeComponentFromFormData(id) {
      this.formData = this.formData.filter((component) => component.id !== id)
    },
    // 通过 ID 获取组件
    getComponentById(id) {
      return this.formData.find((component) => component.id === id)
    },
    // 重新排序表单数据
    reorderFormDataByIndex(oldIndex: number, newIndex: number) {
      if (
        oldIndex < 0 ||
        oldIndex >= this.formData.length ||
        newIndex < 0 ||
        newIndex >= this.formData.length
      ) {
        console.error('索引超出范围')
        return
      }

      // 从数组中移除旧位置的元素
      const [movedItem] = this.formData.splice(oldIndex, 1)

      // 在新位置插入该元素
      this.formData.splice(newIndex, 0, movedItem)

      console.log('重新排序后的表单数据', this.formData)
    },

    // 在指定索引位置添加新组件
    addComponentAtIndex(newIndex: number, name: string) {
      if (newIndex < 0 || newIndex > this.formData.length) {
        console.error('索引超出范围')
        return
      }
      this.formData.splice(newIndex, 0, initialValueMap[name]())
    },
  },
})
