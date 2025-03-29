<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from '@/utils/theme.ts'
import { darkTheme, lightTheme } from 'naive-ui'
import customTheme from '@/styles/customTheme.ts'
import NavBar from '@/components/NavBar.vue'

const { theme, resolvedTheme, setTheme } = useTheme()
</script>

<template>
  <n-config-provider
    :theme="resolvedTheme === 'light' ? lightTheme : darkTheme"
    :theme-overrides="resolvedTheme === 'dark' ? customTheme.dark : customTheme.light"
  >
    <!--<n-h1 class="font-bold text-xl leading-tight"> 34</n-h1>-->
    <!--<n-alert type="info" class="mt-4">-->
    <!--  <span class="font-bold">Tip:</span> You can use the <code>vue-router</code> component to-->
    <!--  render the current route component.-->
    <!--</n-alert>-->
    <!--{{ theme }}-->
    <!--{{ resolvedTheme }}-->
    <!--<n-button type="primary" :onclick="() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')"-->
    <!--  >Toggle Theme-->
    <!--</n-button>-->
    <!--<n-text class="text-mint-500"> 34234</n-text>-->
    <NavBar />
    <n-h1 class="text-center w-full">EasyForm 零代码表单生成器</n-h1>
    <div class="flex m-4">
      <n-button type="success" class="mr-4">创建表单</n-button>
      <n-button type="default">所有表单</n-button>
    </div>
    <div class="grid grid-cols-4 m-4">
      <n-card title="卡片" hoverable>
        卡片内容
        <n-image
          width="100"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <n-space>
          <n-tag :bordered="false"> 爱在西元前 </n-tag>
          <n-tag :bordered="false" type="success"> 不该 </n-tag>
          <n-tag :bordered="false" type="warning"> 超人不会飞 </n-tag>
          <n-tag :bordered="false" type="error"> 手写的从前 </n-tag>
          <n-tag :bordered="false" type="info"> 哪里都是你 </n-tag>
        </n-space>
        <n-space>
          <n-button strong secondary circle type="info">
            <template #icon>
              <n-icon><EditIcon/></n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon><DeleteIcon /></n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>
    </div>
    <RouterView />
  </n-config-provider>
</template>

<style scoped></style>
