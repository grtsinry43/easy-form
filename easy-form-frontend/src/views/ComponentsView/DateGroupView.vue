<script setup lang="ts">
import Layout from './Layout.vue'
import DateComponent from '../../components/survey-coms/DateComponent.vue'
</script>

<template>
  <Layout>
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">基础日期选择</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateComponent label="日期选择" type="date" />
          <DateComponent label="日期时间" type="datetime" />
          <DateComponent label="月份选择" type="month" />
          <DateComponent label="年份选择" type="year" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">日期范围</h3>
        <div class="grid grid-cols-1 gap-4">
          <DateComponent label="日期范围" type="daterange" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">其他特性</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateComponent label="必填项" type="date" required />
          <DateComponent label="禁用状态" type="date" disabled />
          <DateComponent label="自定义格式" type="date" format="yyyy年MM月dd日" />
          <DateComponent label="禁用清除" type="date" :clearable="false" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style> 