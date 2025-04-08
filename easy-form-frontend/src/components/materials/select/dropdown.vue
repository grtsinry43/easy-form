<template>
  <n-h2> 选择题默认标题</n-h2>
  <n-p> 有的时候，或许你更喜欢下拉选择的方式来做出选择</n-p>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" placeholder="那就来选一选吧" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(null),
      options: [
        {
          value: '选项1',
          label: '选项1',
        },
        {
          value: '选项2',
          label: '选项2',
        },
        {
          value: '选项3',
          label: '选项3',
        },
        {
          value: '选项4',
          label: '这个选项它遥不可及',
          disabled: true,
        },
      ],
    }
  },
})
</script>
