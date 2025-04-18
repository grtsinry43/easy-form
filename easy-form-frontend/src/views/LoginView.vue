<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { HelpCircle } from 'lucide-vue-next'

import { GoogleOutlined, AppleFilled, GithubFilled } from '@vicons/antd'
import { LogoMicrosoft } from '@vicons/ionicons5'
import { ArrowCircleRight28Regular } from '@vicons/fluent'

const email = ref('')
const showGooglePopup = ref(false)
const typedText = ref('')
const fullText = '即刻开始便捷美观的表单体验。'
const typingSpeed = 50 // 打字速度 (ms)

// 实现打字效果的函数
onMounted(() => {
  let index = 0
  const typeNextChar = () => {
    if (index < fullText.length) {
      typedText.value = fullText.substring(0, index) + '_'
      index++
      setTimeout(typeNextChar, typingSpeed)
    } else {
      typedText.value = fullText // 完成打字后去掉下划线
    }
  }

  typeNextChar()
})
</script>

<template>
  <div class="h-full justify-center items-center flex flex-col">
    <div class="w-full max-w-md px-4 mt-16">
      <!-- Login Form -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-medium text-gray-800 dark:text-gray-100 mb-2">
          {{ typedText }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400">登录到 EasyForm 平台</p>
      </div>

      <!-- Social Login Buttons with Left-aligned Icons -->
      <div class="space-y-3 mb-4">
        <n-button class="w-full custom-login-btn" type="default" @click="showGooglePopup = true">
          <div class="flex items-center w-full">
            <div class="flex-none ml-2">
              <n-icon size="14">
                <GoogleOutlined />
              </n-icon>
            </div>
            <div class="flex-grow text-center">通过 Google 登录</div>
          </div>
        </n-button>

        <n-button class="w-full custom-login-btn" type="default">
          <div class="flex items-center w-full">
            <div class="flex-none ml-2">
              <n-icon size="14">
                <GithubFilled />
              </n-icon>
            </div>
            <div class="flex-grow text-center">通过 Github 登录</div>
          </div>
        </n-button>

        <!--<n-button class="w-full custom-login-btn" type="default">-->
        <!--  <div class="flex items-center w-full">-->
        <!--    <div class="flex-none ml-2">-->
        <!--      <n-icon size="14">-->
        <!--        <AppleFilled />-->
        <!--      </n-icon>-->
        <!--    </div>-->
        <!--    <div class="flex-grow text-center"> 通过 Apple 登录 </div>-->
        <!--  </div>-->
        <!--</n-button>-->

        <!--<n-button class="w-full custom-login-btn" type="default">-->
        <!--  <div class="flex items-center w-full">-->
        <!--    <div class="flex-none ml-2">-->
        <!--      <n-icon size="14">-->
        <!--        <LogoMicrosoft />-->
        <!--      </n-icon>-->
        <!--    </div>-->
        <!--    <div class="flex-grow text-center"> 通过 Microsoft 登录 </div>-->
        <!--  </div>-->
        <!--</n-button>-->
      </div>

      <!-- Email Input -->
      <div class="mb-4">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">
          当然，你也可以通过邮件地址继续
        </div>
        <n-input v-model:value="email" placeholder="输入你的邮件地址..." class="rounded-md">
          <template #suffix>
            <n-icon>
              <ArrowCircleRight28Regular />
            </n-icon>
          </template>
        </n-input>
      </div>

      <!-- Continue Button -->
      <n-button type="primary" block class="mb-6" :disabled="!email"> 继续</n-button>

      <!-- Terms -->
      <div class="text-xs text-gray-500 dark:text-gray-400 text-center">
        你的昵称和头像会显示给受邀填写表单的 <br />
        用户。继续操作即表示，你已确认理解并 <br />
        同意此 <a href="#" class="text-gray-500 dark:text-gray-400 underline"> 条款和条件 </a> 和
        <a href="#" class="text-gray-500 dark:text-gray-400 underline"> 隐私政策 </a>。
      </div>
    </div>

    <!-- Google Login Popup -->
    <n-modal
      v-model:show="showGooglePopup"
      preset="card"
      style="width: 400px"
      :mask-closable="true"
      :close-on-esc="true"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              class="w-5 h-5 mr-2"
            />
            <span> 使用 Google 账号登录 </span>
          </div>
        </div>
      </template>

      <div class="py-4">
        <div class="text-lg font-medium mb-2">使用您的 Google 账号登录 Notion</div>
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-6">
          不再需要记住密码，享受快速、简单、安全的登录体验。
        </div>

        <n-button type="primary" block> 继续</n-button>
      </div>
    </n-modal>

    <!-- Help Button -->
    <div class="fixed bottom-4 right-4">
      <n-button circle quaternary>
        <template #icon>
          <n-icon>
            <help-circle />
          </n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<style scoped>
/* Custom styling for login buttons with left-aligned icons */
:deep(.custom-login-btn .n-button__content) {
  width: 100%;
  padding: 0;
}
</style>
