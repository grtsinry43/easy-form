<template>
  <n-h2>图片单选题默认标题</n-h2>
  <n-p>从下面的图片选项中选择一项</n-p>
  <n-radio-group v-model:value="value" name="imageRadioGroup">
    <n-space horizontal>
      <n-card
        v-for="option in options"
        :key="option.value"
        :class="{ 'selected-card': value === option.value }"
        hoverable
        @click="value = option.value"
        class="image-card"
      >
        <template #cover>
          <img :src="option.imageUrl" alt="option.label" class="option-image" />
        </template>
        <n-radio class="mt-2" :value="option.value">{{ option.label }}</n-radio>
      </n-card>
    </n-space>
  </n-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(null),
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
