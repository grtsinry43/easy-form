<script setup lang="ts">
import Layout from './Layout.vue'
import SelectComponent from '../../components/survey-coms/SelectComponent.vue'

const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' },
  { label: '选项5', value: '5' }
]

const longOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' },
  { label: '选项5', value: '5' },
  { label: '选项6', value: '6' },
  { label: '选项7', value: '7' },
  { label: '选项8', value: '8' },
  { label: '选项9', value: '9' },
  { label: '选项10', value: '10' }
]
</script>

<template>
  <Layout>
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">基础选择</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectComponent label="单选" :options="options" />
          <SelectComponent label="多选" :options="options" multiple />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">带标签限制</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectComponent label="限制标签数" :options="longOptions" multiple :maxTagCount="3" />
          <SelectComponent label="必填项" :options="options" required />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">禁用状态</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectComponent label="禁用选择" :options="options" disabled />
          <SelectComponent label="禁用多选" :options="options" multiple disabled />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
