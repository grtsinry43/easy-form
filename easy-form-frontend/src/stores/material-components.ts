// 组件市场里面所有组件状态的仓库
import { defineStore } from 'pinia'
import { initialValueMap } from '@/configs/initialValue/initialValueMap.ts'
import type { BaseComponentType } from '@/types/material.ts'
import type { ComponentValueMap } from '@/configs/initialValue/initialValueMap.ts'
import type { Component } from 'vue'

// 定义 MaterialStoreType，动态根据 ComponentValueMap 推断类型
type MaterialStoreType = {
  currentMaterialComponent: keyof ComponentValueMap // 当前选中的组件
  components: {
    [K in keyof ComponentValueMap]: BaseComponentType<ComponentValueMap[K]>
  }
}

// 定义组件值的类型
type ComponentValue = {
  id: string
  value: string | number | string[] | number[]
  currentValue?: number
  isShow: boolean
  type: string
  editComponent: Component
}

export const useMaterialStore = defineStore('materialStore', {
  state: (): MaterialStoreType => ({
    currentMaterialComponent: 'single-choice', // 当前选中的组件
    components: {
      'single-choice': initialValueMap['single-choice'](),
      'single-line': initialValueMap['single-line'](),
      'multi-line': initialValueMap['multi-line'](),
      'text-remark': initialValueMap['text-remark'](),
      'image-remark': initialValueMap['image-remark'](),
      rating: initialValueMap['rating'](),
      time: initialValueMap['time'](),
      dropdown: initialValueMap['dropdown'](),
      'multiple-choice': initialValueMap['multiple-choice'](),
      'image-single': initialValueMap['image-single'](),
      'image-multiple': initialValueMap['image-multiple'](),
    },
  }),
  actions: {
    // 设置当前选中的组件
    setCurrentMaterialComponent(component: keyof ComponentValueMap) {
      this.currentMaterialComponent = component
    },
    // 更新当前选中的组件的状态
    updateComponentState(key: string, value?: string | number | boolean | object) {
      // 获取当前选中的组件类型
      const currentComponent = this.currentMaterialComponent

      // 检查 key 是否存在于当前组件的 value 中
      if (key in this.components[currentComponent].value) {
        // 如果 value 是基础类型，直接更新值
        if (typeof value !== 'undefined') {
          // 使用类型断言确保 TypeScript 不会报错
          const componentValue = this.components[currentComponent].value as Record<
            string,
            ComponentValue
          >

          // 根据属性类型判断如何更新
          if ('currentValue' in componentValue[key] && typeof value === 'number') {
            // 如果属性有 currentValue 并且传入的是数字，更新 currentValue
            componentValue[key].currentValue = value
          } else {
            // 否则直接更新 value
            componentValue[key].value = value as string | number | string[] | number[]
          }
        }
      }
    },
  },
})
