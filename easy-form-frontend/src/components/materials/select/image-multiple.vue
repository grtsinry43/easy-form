<template>
  <n-h2>图片多选题默认标题</n-h2>
  <n-p>从下面的图片选项中选择一项或多项</n-p>
  <n-space horizontal>
    <n-card
      v-for="option in options"
      :key="option.value"
      :class="{ 'selected-card': checkedValues.includes(option.value) }"
      hoverable
      @click="toggleOption(option.value)"
      class="image-card"
    >
      <template #cover>
        <img :src="option.imageUrl" alt="option.label" class="option-image" />
      </template>
      <n-checkbox :checked="checkedValues.includes(option.value)" class="mt-2">
        {{ option.label }}
      </n-checkbox>
    </n-card>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checkedValues = ref<string[]>([])

    const toggleOption = (value: string) => {
      if (checkedValues.value.includes(value)) {
        checkedValues.value = checkedValues.value.filter(v => v !== value)
      } else {
        checkedValues.value.push(value)
      }
    }

    return {
      checkedValues,
      toggleOption,
      options: [
        {
          value: 'option1',
          label: '选项1',
          imageUrl: 'https://picsum.photos/200/100?random=1',
        },
        {
          value: 'option2',
          label: '选项2',
          imageUrl: 'https://picsum.photos/200/100?random=2',
        },
        {
          value: 'option3',
          label: '选项3',
          imageUrl: 'https://picsum.photos/200/100?random=3',
        },
      ],
    }
  },
})
</script>

<style scoped>
.image-card {
  width: 220px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.selected-card {
  border-color: var(--primary, #18a058);
}

.option-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
