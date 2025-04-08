<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(null),
      songs: [
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
      ].map((s) => {
        s.value = s.value.toLowerCase()
        return s
      }),
    }
  },
})
</script>

<template>
  <n-h2> 选择题默认标题 </n-h2>
  <n-p> 这是一段叙述，嗯，很好的叙述，做出你的选择叭</n-p>
  <n-radio-group v-model:value="value" name="radiogroup">
    <n-space>
      <n-radio v-for="song in songs" :key="song.value" :value="song.value">
        {{ song.label }}
      </n-radio>
    </n-space>
  </n-radio-group>
</template>
