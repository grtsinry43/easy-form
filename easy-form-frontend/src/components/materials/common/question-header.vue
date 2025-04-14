<template>
  <div>
    <div class="mb-4">
      <!-- 标题 -->
      <n-h2
        class="font-light flex items-center"
        :style="{
          fontSize: `${titleSize}px`,
          color: titleColor,
        }"
      >
        <span class="mr-2">{{ serialNum }}.</span>
        <span
          :class="{
            'font-bold': titleWeight,
            italic: titleItalic,
          }"
        >
          {{ title }}
        </span>
      </n-h2>
      <!-- 描述 -->
      <div
        class="mt-2"
        :class="{
          'font-bold': descWeight,
          italic: descItalic,
        }"
        :style="{
          fontSize: `${descSize}px`,
          color: descColor,
        }"
      >
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  serialNum: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  titleSize: {
    type: String,
    default: '22',
  },
  descSize: {
    type: String,
    default: '16',
  },
  titleWeight: {
    type: Number,
    default: 0,
  },
  descWeight: {
    type: Number,
    default: 0,
  },
  titleItalic: {
    type: Number,
    default: 0,
  },
  descItalic: {
    type: Number,
    default: 0,
  },
  titleColor: {
    type: String,
    default: '',
  },
  descColor: {
    type: String,
    default: '',
  },
})
</script>

<style scoped></style>
