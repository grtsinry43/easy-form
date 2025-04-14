import type { defineComponent } from 'vue';

// 导出 vue 组件类型
export type VueComponentType = ReturnType<typeof defineComponent>;
