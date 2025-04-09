<template>
  <div
    class="w-full bg-gray-50/70 dark:bg-black/70 backdrop-blur-md shadow-sm border-b border-gray-200 fixed top-0 z-20"
  >
    <div class="mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="flex items-center">
              <div class="text-primary text-2xl mr-2">
                <FormIcon />
              </div>
              <span class="font-bold text-lg">EasyForm</span>
            </div>
          </div>
          <!-- Desktop Navigation -->
          <div class="hidden md:block ml-10">
            <div class="flex items-center space-x-4">
              <router-link to="/">
                <n-button text class="px-3 py-2">
                  <template #icon>
                    <HomeIcon class="h-4 w-4 mr-1" />
                  </template>
                  首页
                </n-button>
              </router-link>
              <router-link to="/components">
                <n-button text class="px-3 py-2">
                  <template #icon>
                    <LayoutIcon class="h-4 w-4 mr-1" />
                  </template>
                  组件中心
                </n-button>
              </router-link>
              <router-link to="/templates">
                <n-button text class="px-3 py-2">
                  <template #icon>
                    <FileTextIcon class="h-4 w-4 mr-1" />
                  </template>
                  模板中心
                </n-button>
              </router-link>
              <router-link to="/">
                <n-button text class="px-3 py-2">
                  <template #icon>
                    <DatabaseIcon class="h-4 w-4 mr-1" />
                  </template>
                  数据统计
                </n-button>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Right side menu -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-3">
            <!-- 在模板中替换主题切换按钮 -->
            <n-button circle @click="toggleTheme">
              <template #icon>
                <SunIcon v-if="resolvedTheme === 'dark'" />
                <MoonIcon v-else />
              </template>
            </n-button>
            <n-button circle>
              <template #icon>
                <BellIcon />
              </template>
            </n-button>
            <n-button type="primary" class="px-3 py-2"> 登录</n-button>
            <n-dropdown :options="userOptions" @select="handleSelect">
              <n-avatar round size="small" :src="userAvatar">
                {{ !userAvatar ? 'U' : '' }}
              </n-avatar>
            </n-dropdown>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <n-button circle @click="mobileMenuOpen = !mobileMenuOpen">
            <template #icon>
              <MenuIcon v-if="!mobileMenuOpen" />
              <XIcon v-else />
            </template>
          </n-button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden" v-if="mobileMenuOpen">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
        <n-button block text type="primary" class="w-full text-left px-3 py-2">
          <template #icon>
            <HomeIcon class="h-4 w-4 mr-2" />
          </template>
          首页
        </n-button>
        <n-button block text class="w-full text-left px-3 py-2">
          <template #icon>
            <LayoutIcon class="h-4 w-4 mr-2" />
          </template>
          模板
        </n-button>
        <n-button block text class="w-full text-left px-3 py-2">
          <template #icon>
            <FileTextIcon class="h-4 w-4 mr-2" />
          </template>
          表单
        </n-button>
        <n-button block text class="w-full text-left px-3 py-2">
          <template #icon>
            <DatabaseIcon class="h-4 w-4 mr-2" />
          </template>
          数据
        </n-button>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <n-button circle>
            <template #icon>
              <BellIcon />
            </template>
          </n-button>
          <n-avatar round size="small" :src="userAvatar">
            {{ !userAvatar ? 'U' : '' }}
          </n-avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  HomeIcon,
  LayoutIcon,
  FileTextIcon,
  DatabaseIcon,
  BellIcon,
  MenuIcon,
  XIcon,
  FileIcon as FormIcon,
  SunIcon,
  MoonIcon,
} from 'lucide-vue-next'
import { useTheme } from '@/utils/theme.ts'

const mobileMenuOpen = ref(false)
const userAvatar = ref('')

const { resolvedTheme, setTheme } = useTheme()

const toggleTheme = () => {
  setTheme(resolvedTheme.value === 'light' ? 'dark' : 'light')
}

onMounted(() => {})

const userOptions = [
  {
    label: '个人设置',
    key: 'settings',
  },
  {
    label: '我的账户',
    key: 'account',
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]

const handleSelect = (key: string) => {
  console.log('Selected:', key)
  // Handle dropdown selection
  if (key === 'logout') {
    // Handle logout
  }
}
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
