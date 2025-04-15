<template>
  <QuestionHeader
    :serialNum="serialNum"
    :title="computedState.title"
    :desc="computedState.desc"
    :titleSize="computedState.titleSize"
    :descSize="computedState.descSize"
    :titleWeight="computedState.titleWeight"
    :descWeight="computedState.descWeight"
    :titleItalic="computedState.titleItalic"
    :descItalic="computedState.descItalic"
    :titleColor="computedState.titleColor"
    :descColor="computedState.descColor"
  />
  <n-checkbox-group v-model:value="selectedValues">
    <n-space horizontal>
      <n-card
        v-for="option in computedState.options"
        :key="option"
        :class="{ 'selected-card': selectedValues.includes(option) }"
        hoverable
        @click="toggleOption(option)"
        class="image-card"
      >
        <template #cover>
          <img :src="option" alt="选项图片" class="option-image" />
        </template>
        <n-checkbox class="mt-2" :value="option">{{ option }}</n-checkbox>
      </n-card>
    </n-space>
  </n-checkbox-group>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import QuestionHeader from '@/components/materials/common/question-header.vue'
import {
  getTextValue,
  getCurrentValue,
  getStringValueByCurrentValue,
  getStringValue,
} from '@/utils/get-value.ts'
import type { ImageMultipleValue } from '@/configs/initialValue/image-multiple.ts'

const props = defineProps<{
  serialNum: number
  value: ImageMultipleValue
}>()

const selectedValues = ref<string[]>([])

const toggleOption = (value: string) => {
  if (selectedValues.value.includes(value)) {
    selectedValues.value = selectedValues.value.filter((v) => v !== value)
  } else {
    selectedValues.value.push(value)
  }
}

const computedState = computed(() => {
  if (!props.value) {
    return {
      title: '',
      desc: '',
      options: [],
      titleSize: '',
      descSize: '',
      titleWeight: 0,
      descWeight: 0,
      titleItalic: 0,
      descItalic: 0,
      titleColor: '',
      descColor: '',
    }
  }

  return {
    title: getTextValue(props.value.title),
    desc: getTextValue(props.value.desc),
    options: getStringValue(props.value.options),
    titleSize: getStringValueByCurrentValue(props.value.titleSize),
    descSize: getStringValueByCurrentValue(props.value.descSize),
    titleWeight: getCurrentValue(props.value.titleWeight),
    descWeight: getCurrentValue(props.value.descWeight),
    titleItalic: getCurrentValue(props.value.titleItalic),
    descItalic: getCurrentValue(props.value.descItalic),
    titleColor: getTextValue(props.value.titleColor),
    descColor: getTextValue(props.value.descColor),
  }
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
