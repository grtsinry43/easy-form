// 组件市场里面所有组件状态的仓库
import { defineStore } from 'pinia'
import { initialValueMap } from '@/configs/initialValue/initialValueMap.ts'
import type { BaseComponentType } from '@/types/material.ts'
import type { ComponentValueMap } from '@/configs/initialValue/initialValueMap.ts'

// 定义 MaterialStoreType，动态根据 ComponentValueMap 推断类型
type MaterialStoreType = {
  currentMaterialComponent: keyof ComponentValueMap // 当前选中的组件
  components: {
    [K in keyof ComponentValueMap]: BaseComponentType<ComponentValueMap[K]>
  }
}

export const useMaterialStore = defineStore('materialStore', {
  state: (): MaterialStoreType => ({
    currentMaterialComponent: 'single-select', // 当前选中的组件
    components: {
      'single-select': initialValueMap['single-select'](),
      // 如果有其他组件类型，在这里继续添加
    },
  }),
})
