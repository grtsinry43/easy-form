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
  <n-time-picker :format="computedState.format" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import QuestionHeader from '@/components/materials/common/question-header.vue'

import { getTextValue, getCurrentValue, getStringValueByCurrentValue } from '@/utils/get-value.ts'

import type { TimeValue } from '@/configs/initialValue/time.ts'

const props = defineProps<{
  serialNum: number
  value: TimeValue
}>()

const computedState = computed(() => ({
  title: getTextValue(props.value.title),
  desc: getTextValue(props.value.desc),
  format: getTextValue(props.value.format),
  position: getCurrentValue(props.value.position),
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

<style scoped></style>
