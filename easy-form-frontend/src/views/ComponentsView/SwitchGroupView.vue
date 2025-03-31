<script setup lang="ts">
import Layout from './Layout.vue'
import SwitchComponent from '../../components/survey-coms/SwitchComponent.vue'
</script>

<template>
  <Layout>
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">基础开关</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SwitchComponent label="默认开关" />
          <SwitchComponent label="圆角开关" round />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">尺寸</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SwitchComponent label="小尺寸" size="small" />
          <SwitchComponent label="中尺寸" size="medium" />
          <SwitchComponent label="大尺寸" size="large" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">自定义值</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SwitchComponent 
            label="自定义选中值" 
            :checkedValue="'yes'" 
            :uncheckedValue="'no'" 
          />
          <SwitchComponent 
            label="数字值" 
            :checkedValue="1" 
            :uncheckedValue="0" 
          />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">其他特性</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SwitchComponent label="必填项" required />
          <SwitchComponent label="禁用状态" disabled />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style> 