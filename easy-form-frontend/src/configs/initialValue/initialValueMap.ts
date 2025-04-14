// 该文件用于定义默认状态的映射表
import singleSelectInitialValue from './single-select.ts'
import type { SingleSelectValue } from '@/configs/initialValue/single-select.ts'

// 定义组件类型映射
export type ComponentValueMap = {
  'single-select': SingleSelectValue
  // 如果有其他组件类型，在这里继续添加
  // 'other-component': OtherComponentValue
}

export const initialValueMap = {
  'single-select': singleSelectInitialValue,
}
