<template>
  <header
    class="w-full bg-gray-50/70 dark:bg-black/70 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 fixed top-0 z-20"
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
            <n-dropdown :options="notificationList" @select="handleSelect">
              <n-button circle>
                <template #icon>
                  <BellIcon />
                </template>
              </n-button>
            </n-dropdown>
            <n-button
              type="primary"
              class="px-3 py-2"
              v-if="user.isLogin == false"
              @click="router.push('/login')"
            >
              登录
            </n-button>
            <n-dropdown :options="userOptions" @select="handleSelect" v-else>
              <n-avatar round size="small" :src="user.userInfo.avatar" />
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
          <n-avatar round size="small" :src="user.userInfo.avatar" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
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
import { useUserStore } from '@/stores/user.ts'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/api/user.ts'
import { NAvatar, NButton, NDropdown, NText, NCard } from 'naive-ui'

const mobileMenuOpen = ref(false)

const { resolvedTheme, setTheme } = useTheme()

const toggleTheme = () => {
  setTheme(resolvedTheme.value === 'light' ? 'dark' : 'light')
}

const user = useUserStore()

const router = useRouter()

onMounted(async () => {
  const userInfo = await getUserInfo()
  if (userInfo) {
    user.setUserInfo(userInfo)
    user.setLogin(true)
  }
})

const renderCustomHeader = () => {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;',
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: user.userInfo.avatar,
      }),
      h('div', null, [
        h('div', null, [h(NText, { depth: 2 }, { default: () => user.userInfo.nickname })]),
        h('div', { style: 'font-size: 12px;' }, [
          h(NText, { depth: 3 }, { default: () => user.userInfo.email }),
        ]),
      ]),
    ],
  )
}

const userOptions = [
  {
    type: 'render',
    render: renderCustomHeader,
    key: 'userInfo',
  },
  {
    type: 'divider',
    key: 'd1',
  },
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
    key: 'd2',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]

const notificationList = [
  {
    label: '系统消息',
    key: 'system',
  },
  {
    label: '表单消息',
    key: 'form',
  },
  {
    label: '问卷消息',
    key: 'questionnaire',
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '通知设置',
    key: 'settings',
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
