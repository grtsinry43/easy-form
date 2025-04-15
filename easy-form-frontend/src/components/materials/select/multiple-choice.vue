<script setup lang="ts">
import { computed, ref } from 'vue'
import QuestionHeader from '@/components/materials/common/question-header.vue'
import {
  getTextValue,
  getCurrentValue,
  getStringValueByCurrentValue,
  getStringValue,
} from '@/utils/get-value.ts'
import type { MultipleChoiceValue } from '@/configs/initialValue/multiple-choice.ts'

const props = defineProps<{
  serialNum: number
  value: MultipleChoiceValue
}>()

const selectedValues = ref<string[]>([])

const computedState = computed(() => ({
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
}))
</script>

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
    <n-space>
      <n-checkbox v-for="option in computedState.options" :key="option" :value="option">
        {{ option }}
      </n-checkbox>
    </n-space>
  </n-checkbox-group>
</template>

<style scoped></style>
