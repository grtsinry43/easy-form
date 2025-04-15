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
  <n-select
    v-model:value="selectedValue"
    :options="computedState.options.map((option) => ({ label: option, value: option }))"
    :placeholder="computedState.placeholder"
  />
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
import type { DropdownValue } from '@/configs/initialValue/dropdown.ts'

const props = defineProps<{
  serialNum: number
  value: DropdownValue
}>()

const selectedValue = ref<string | null>(null)

const computedState = computed(() => ({
  title: getTextValue(props.value.title),
  desc: getTextValue(props.value.desc),
  options: getStringValue(props.value.options),
  placeholder: getTextValue(props.value.placeholder),
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
