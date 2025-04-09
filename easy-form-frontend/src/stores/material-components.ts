// 组件市场里面所有组件状态的仓库
import { defineStore } from 'pinia'
import { initialValueMap } from '@/configs/initialValue/initialValueMap.ts'

export const useMaterialStore = defineStore('materialStore', {
  state: () => ({
    currentMaterialCom: 'single-select', // 当前选中的组件
    // 记录所有的业务组件
    components: {
      'single-select': initialValueMap['single-select'](),
    },
  }),
})
