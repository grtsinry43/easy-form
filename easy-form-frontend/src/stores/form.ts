import { defineStore } from 'pinia'
import { initialValueMap, type ComponentValueMap } from '@/configs/initialValue/initialValueMap' // 假设 ComponentValueMap 在这里导出
import type { BaseComponentType, ComponentProperty } from '@/types/material' // 引入核心类型
import eventBus from '@/utils/eventBus'

// 为从 JSON 解析的数据定义更具体的类型
interface RawComponentValueProperty {
  id: string
  value: string | string[] | number | number[]
  currentValue?: number
  isShow: boolean
  type: string
  // editComponent 在原始数据中不存在，会在初始化时添加
}

interface RawFormComponentData {
  id: string
  type: keyof ComponentValueMap // 使用映射确保类型有效
  component: string // 原始数据中可能只有组件名或标识符
  value: Record<string, RawComponentValueProperty>
}

// 定义表单元数据类型
interface FormMeta {
  title: string
  description: string
  coverImage: string
  formId: string
  formType: string
}

// 定义 State 的类型
interface EditorState {
  currentEditComponentId: string
  formMeta: FormMeta
  // 使用联合类型，以便 formData 中的每个元素都有其特定的 value 类型
  formData: Array<BaseComponentType<ComponentValueMap[keyof ComponentValueMap]>>
}

export const useFormStore = defineStore('editorStore', {
  state: (): EditorState => ({
    currentEditComponentId: '',
    formMeta: {
      title: '',
      description: '',
      coverImage: '',
      formId: '',
      formType: 'form',
    },
    // 初始化时可以为空，或根据需要加载默认值
    // 注意：这里的初始值可能与类型定义不完全匹配，因为它们是函数调用
    // 为了类型安全，最好在应用加载后通过 action 初始化
    formData: [] as Array<BaseComponentType<ComponentValueMap[keyof ComponentValueMap]>>, // 添加类型断言以匹配 EditorState
  }),
  actions: {
    updateComponentInFormData(configKey: string, newVal: string | number | string[] | number[]) {
      console.log('updateComponentInFormData', configKey, newVal)

      const component = this.formData.find((comp) => comp.id === this.currentEditComponentId)

      console.log('component found:', component)
      if (!component) {
        console.error(`Component with id ${this.currentEditComponentId} not found.`)
        return
      }

      // 检查 configKey 是否是 component.value 的有效属性
      // 使用类型守卫代替 'as' 断言
      if (
        component.value &&
        typeof component.value === 'object' &&
        component.value.hasOwnProperty(configKey)
      ) {
        // 获取目标属性对象，类型为 ComponentProperty (或其他在 ComponentValueMap 中定义的类型)
        const targetProperty = component.value[
          configKey as keyof typeof component.value
        ] as ComponentProperty // 使用 keyof 和断言，因为 configKey 是动态的

        if (!targetProperty) {
          console.error(`Property ${configKey} not found in component value.`)
          return
        }

        // 根据属性类型和新值的类型安全地更新
        // 检查 targetProperty 是否有 currentValue 属性
        const hasCurrentValue = 'currentValue' in targetProperty

        if (hasCurrentValue && typeof newVal === 'number') {
          // 如果属性有 currentValue 并且新值是数字，更新 currentValue
          targetProperty.currentValue = newVal
          console.log(`Updated currentValue for ${configKey}:`, newVal)
        } else if (
          typeof targetProperty.value === typeof newVal ||
          (Array.isArray(targetProperty.value) && Array.isArray(newVal))
        ) {
          // 否则，如果类型匹配，直接更新 value
          targetProperty.value = newVal
          console.log(`Updated value for ${configKey}:`, newVal)
        } else {
          console.warn(
            `Type mismatch for property ${configKey}. Expected ${typeof targetProperty.value} or array, got ${typeof newVal}. Update skipped.`,
          )
        }
      } else {
        console.error(`Invalid configKey "${configKey}" for component type ${component.type}`)
      }
    },
    initEditorData({
      id,
      title,
      description,
      type,
      cover,
      value, // value 是序列化后的 formData 字符串
    }: {
      id: string
      title: string
      description: string
      type: string // 表单类型
      cover: string
      value: string // JSON 字符串形式的 formData
    }) {
      this.formMeta = {
        title,
        description,
        coverImage: cover,
        formId: id,
        formType: type,
      }

      try {
        // 解析 JSON 字符串，并指定类型
        const dataArr = JSON.parse(value) as RawFormComponentData[]

        // 使用 map 转换数据，并确保类型安全
        this.formData = dataArr
          .map((item): BaseComponentType<ComponentValueMap[keyof ComponentValueMap]> => {
            const componentType = item.type // 类型已经是 keyof ComponentValueMap
            const initialValueFn = initialValueMap[componentType]

            if (!initialValueFn) {
              console.error(`Unknown component type during init: ${componentType}`)
              // 返回一个错误对象或进行其他处理，这里简单抛出错误
              throw new Error(`Unknown component type: ${componentType}`)
              // 或者返回一个默认/空状态，但这可能导致后续问题
              // return { id: item.id, type: 'unknown', component: markRaw(SomeDefaultComponent), value: {} } as any;
            }

            const initialComponentData = initialValueFn() // 获取该类型组件的初始结构和 editComponent

            // 合并 value，保留 editComponent 和其他初始属性
            const processedValue: Record<string, ComponentProperty> = {}
            for (const key in initialComponentData.value) {
              if (initialComponentData.value.hasOwnProperty(key)) {
                const initialProp = (
                  initialComponentData.value as Record<string, ComponentProperty>
                )[key]
                const savedProp = item.value[key] // 来自存储的数据

                if (initialProp) {
                  processedValue[key] = {
                    ...initialProp, // 保留初始结构，特别是 editComponent
                    ...(savedProp && {
                      // 如果存储中有对应属性，则覆盖 id, value, currentValue, isShow
                      id: savedProp.id,
                      value: savedProp.value,
                      isShow: savedProp.isShow,
                      // 只有当 currentValue 存在时才覆盖
                      ...(savedProp.currentValue !== undefined && {
                        currentValue: savedProp.currentValue,
                      }),
                    }),
                    editComponent: null,
                  }
                }
              }
            }

            return {
              id: item.id, // 使用存储的 ID
              type: componentType,
              component: initialComponentData.component, // 使用初始化的组件引用
              value: processedValue as any, // TODO: 这里的 'as any' 仍然是一个问题，理想情况需要更精确的类型映射
              // processedValue 的类型应匹配 ComponentValueMap[componentType]
              // 但动态构建时精确匹配泛型比较困难
            }
          })
          .filter(Boolean) // 过滤掉可能的错误处理导致的 null/undefined
      } catch (error) {
        console.error('Failed to parse or initialize form data:', error)
        this.formData = [] // 解析失败时清空数据
      }
    },
  },
})
