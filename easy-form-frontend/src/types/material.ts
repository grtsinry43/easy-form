import type { VueComponentType } from '@/types/common.ts'

export type BaseComponentType<T> = {
  id: string // 组件的唯一标识
  component: VueComponentType
  type: string // 组件的类型
  value: T
}

export type ComponentProperty = {
  id: string
  value: string | string[] | number | number[]
  currentValue?: number
  isShow: boolean
  type: string
  editComponent: VueComponentType
}
