<script setup lang="ts">
import Layout from './Layout.vue'
import NumberComponent from '../../components/survey-coms/NumberComponent.vue'
</script>

<template>
  <Layout>
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">基础数字输入</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberComponent label="整数输入" :precision="0" />
          <NumberComponent label="小数输入" :precision="2" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">范围限制</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberComponent label="最小值限制" :min="0" />
          <NumberComponent label="最大值限制" :max="100" />
          <NumberComponent label="范围限制" :min="0" :max="100" />
          <NumberComponent label="步进值" :step="10" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">其他特性</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberComponent label="必填项" required />
          <NumberComponent label="禁用状态" disabled />
          <NumberComponent label="隐藏按钮" :showButton="false" />
          <NumberComponent label="自定义精度" :precision="3" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style> 