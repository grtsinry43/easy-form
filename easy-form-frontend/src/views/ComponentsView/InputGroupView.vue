<script setup lang="ts">
import Layout from './Layout.vue'
import InputComponent from '../../components/survey-coms/InputComponent.vue'
</script>

<template>
  <Layout>
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">基础输入框</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent label="文本输入" placeholder="请输入文本" />
          <InputComponent label="密码输入" type="password" placeholder="请输入密码" />
          <InputComponent label="邮箱输入" type="email" placeholder="请输入邮箱" />
          <InputComponent label="电话输入" type="tel" placeholder="请输入电话" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">带字数统计</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent label="限制字数" :maxlength="50" showCount />
          <InputComponent label="必填项" required />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">禁用状态</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent label="禁用输入" disabled value="禁用状态" />
          <InputComponent label="禁用必填" disabled required value="禁用必填" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
