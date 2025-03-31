<script setup lang="ts">
import { CheckBoxTwotone, LocalPhoneRound } from '@vicons/material'
import { DrawText20Filled } from '@vicons/fluent'
import { FileSearchOutlined } from '@vicons/antd'
import { Chat, UserAvatar } from '@vicons/carbon'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const menuItems = [
  { path: '/components/select-group', icon: CheckBoxTwotone, label: '选择组件' },
  { path: '/components/input-group', icon: DrawText20Filled, label: '文本输入' },
  { path: '/components/advanced-group', icon: FileSearchOutlined, label: '高级题型' },
  { path: '/components/note-group', icon: Chat, label: '备注说明' },
  { path: '/components/profile-group', icon: UserAvatar, label: '个人信息' },
  { path: '/components/contact-group', icon: LocalPhoneRound, label: '联系方式' },
]

const currentComponent = computed(() => {
  return menuItems.find(item => item.path === route.path)?.label || ''
})

const handleComponentChange = (value: string) => {
  const targetItem = menuItems.find(item => item.label === value)
  if (targetItem) {
    router.push(targetItem.path)
  }
}
</script>

<template>
  <div class="w-full mt-4">
    <n-h1 class="text-center w-full">组件中心</n-h1>
    <div class="mt-4 h-full w-full flex p-12">
      <nav class="w-26">
        <n-list hoverable clickable class="bg-transparent">
          <router-link v-for="item in menuItems" :key="item.path" :to="item.path">
            <n-list-item
              class="h-18 transition-all mb-4 border border-gray-200 dark:border-gray-800 hover:bg-green-100 dark:hover:bg-green-100"
              :class="{
                'bg-green-100 dark:bg-green-900 ml-0': route.path === item.path,
                'ml-2': route.path !== item.path,
              }"
            >
              <div class="flex flex-col justify-center items-center">
                <n-icon class="mr-2" size="20">
                  <component :is="item.icon" />
                </n-icon>
                <div>
                  {{ item.label }}
                </div>
              </div>
            </n-list-item>
          </router-link>
        </n-list>
      </nav>
      <main class="flex-1">
        <div class="mb-4">
          <n-select
            v-model:value="currentComponent"
            :options="menuItems.map(item => ({ label: item.label, value: item.label }))"
            placeholder="选择组件类型"
            @update:value="handleComponentChange"
            class="w-64"
          />
        </div>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
