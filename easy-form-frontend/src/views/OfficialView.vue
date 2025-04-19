<template>
  <div class="min-h-screen font-sans">
    <!-- Hero Section with Spotlight Effect -->
    <section class="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div class="absolute inset-0 dark:opacity-30 opacity-10 overflow-hidden pointer-events-none">
        <div class="absolute -inset-[10%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            class="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#18a058]/30 to-[#36ad6a]/30 blur-3xl animate-pulse-slow"
          ></div>
        </div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center mb-12 md:mb-20">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#18a058] to-[#36ad6a] bg-clip-text text-transparent"
          >
            EasyForm
          </h1>
          <p class="text-xl md:text-2xl font-medium mb-6">零代码表单生成器 · 简单高效</p>
          <n-text depth="3" class="text-base md:text-lg mb-8 block">
            快速创建专业表单，无需编写代码，拖拽即可完成
          </n-text>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <router-link to="/login">
              <n-button type="primary" size="large" class="px-8"> 立即开始</n-button>
            </router-link>
            <n-button size="large" class="px-8"> 查看演示</n-button>
          </div>
        </div>

        <!-- Product Preview -->
        <div class="max-w-4xl mx-auto shadow-sm rounded-md">
          <div
            class="flex rounded-t-md items-center px-4 py-2 bg-[#f5f5f5] dark:bg-[#252525] border-b border-[#ebedf0] dark:border-[#303030]"
          >
            <div class="flex space-x-2 mr-4">
              <div class="w-3 h-3 rounded-full bg-[#ed6a5e]"></div>
              <div class="w-3 h-3 rounded-full bg-[#f4be4f]"></div>
              <div class="w-3 h-3 rounded-full bg-[#61c454]"></div>
            </div>
            <div class="flex-1 h-6 bg-white dark:bg-[#1f1f1f] rounded"></div>
          </div>
          <div class="p-4 bg-[#f9f9f9] dark:bg-[#1f1f1f] rounded-b-md">
            <div
              class="flex flex-col md:flex-row h-[400px] bg-white dark:bg-[#252525] rounded-lg overflow-hidden border border-[#ebedf0] dark:border-[#303030]"
            >
              <!-- Sidebar -->
              <div
                class="w-full md:w-48 bg-[#f5f5f5] dark:bg-[#2a2a2a] p-3 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto"
              >
                <div
                  v-for="i in 6"
                  :key="`sidebar-${i}`"
                  class="flex-shrink-0 h-8 w-full bg-white dark:bg-[#303030] rounded"
                ></div>
              </div>

              <!-- Canvas -->
              <div class="flex-1 p-4 flex flex-col gap-3">
                <div
                  v-for="i in 3"
                  :key="`form-${i}`"
                  class="bg-[#f9f9f9] dark:bg-[#2a2a2a] p-3 rounded border border-[#ebedf0] dark:border-[#303030]"
                >
                  <div class="h-2 w-24 bg-[#e5e5e5] dark:bg-[#3a3a3a] rounded mb-2"></div>
                  <div
                    class="h-8 bg-white dark:bg-[#303030] rounded border border-[#ebedf0] dark:border-[#404040]"
                  ></div>
                </div>
                <div class="mt-auto ml-0 h-9 w-28 rounded bg-[#18a058]"></div>
              </div>

              <!-- Properties -->
              <div
                class="w-full md:w-56 bg-[#f5f5f5] dark:bg-[#2a2a2a] p-3 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto"
              >
                <div
                  v-for="i in 4"
                  :key="`prop-${i}`"
                  class="flex-shrink-0 h-12 w-full bg-white dark:bg-[#303030] rounded"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16 md:py-24 bg-[#f9f9f9] dark:bg-[#1a1a1a]">
      <div class="container mx-auto px-4">
        <h2
          class="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#18a058] to-[#36ad6a] bg-clip-text text-transparent"
        >
          强大功能，简单操作
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <n-card
            v-for="(feature, index) in features"
            :key="index"
            class="transition-shadow hover:shadow-lg"
          >
            <template #header>
              <div class="flex items-center">
                <n-icon size="20" color="#18a058" class="mr-2">
                  <component :is="feature.icon" />
                </n-icon>
                <span class="text-lg font-medium">{{ feature.title }}</span>
              </div>
            </template>
            <n-text depth="3">{{ feature.description }}</n-text>
          </n-card>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <h2
          class="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#18a058] to-[#36ad6a] bg-clip-text text-transparent"
        >
          用户反馈
        </h2>

        <div class="max-w-4xl mx-auto">
          <n-carousel
            show-arrow
            dot-type="line"
            effect="card"
            prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
            next-slide-style="transform: translateX(50%) translateZ(-800px);"
          >
            <n-carousel-item
              v-for="(testimonial, index) in testimonials"
              :key="index"
              style="width: 100%"
            >
              <n-card class="mx-4">
                <div class="flex items-center mb-4">
                  <div class="text-[#fcb040] flex">
                    <n-rate readonly :value="5" size="small" />
                  </div>
                </div>
                <n-text class="mb-6 italic block"> "{{ testimonial.quote }}"</n-text>
                <div class="flex items-center">
                  <n-avatar
                    round
                    size="small"
                    class="mr-3"
                    :src="`https://api.dicebear.com/7.x/micah/svg?seed=${testimonial.name}`"
                  />
                  <div>
                    <div class="font-medium">{{ testimonial.name }}</div>
                    <n-text depth="3" size="small">{{ testimonial.title }}</n-text>
                  </div>
                </div>
              </n-card>
            </n-carousel-item>
          </n-carousel>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24 bg-gradient-to-r from-[#18a058] to-[#36ad6a]">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">准备好开始创建您的表单了吗？</h2>
        <p class="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
          立刻使用社交帐号或邮箱加入 EasyForm，体验零代码表单构建的便捷
        </p>
        <n-button size="large" color="#fff" text-color="#18a058" class="px-8"> 免费注册</n-button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#18181c] text-gray-400 py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
          <div
            class="text-2xl font-bold bg-gradient-to-r from-[#18a058] to-[#36ad6a] bg-clip-text text-transparent mb-4 md:mb-0"
          >
            EasyForm
          </div>
          <div class="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="#" class="text-sm hover:text-white transition-colors"> 关于我们 </a>
            <a href="#" class="text-sm hover:text-white transition-colors"> 使用文档 </a>
            <a href="#" class="text-sm hover:text-white transition-colors"> 定价 </a>
            <a href="#" class="text-sm hover:text-white transition-colors"> 博客 </a>
            <a href="#" class="text-sm hover:text-white transition-colors"> 联系我们 </a>
          </div>
        </div>
        <div
          class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div class="text-sm mb-4 md:mb-0">
            © {{ new Date().getFullYear() }} EasyForm. 保留所有权利
          </div>
          <div class="flex space-x-4">
            <n-button quaternary circle>
              <template #icon>
                <twitter-icon />
              </template>
            </n-button>
            <n-button quaternary circle>
              <template #icon>
                <github-icon />
              </template>
            </n-button>
            <n-button quaternary circle>
              <template #icon>
                <!--<linkedin-icon />-->
              </template>
            </n-button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import {
  NButton,
  NCard,
  NIcon,
  NText,
  NCarousel,
  NCarouselItem,
  NList,
  NListItem,
  NTag,
  NRate,
  NAvatar,
} from 'naive-ui'

// Icons
const FormOutlined = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }),
      h('path', { d: 'M9 3v18' }),
      h('path', { d: 'M13 7h4' }),
      h('path', { d: 'M13 11h4' }),
      h('path', { d: 'M13 15h4' }),
    ],
  )

const ThunderboltOutlined = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [h('path', { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' })],
  )

const AppstoreOutlined = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('rect', { x: '3', y: '3', width: '7', height: '7' }),
      h('rect', { x: '14', y: '3', width: '7', height: '7' }),
      h('rect', { x: '14', y: '14', width: '7', height: '7' }),
      h('rect', { x: '3', y: '14', width: '7', height: '7' }),
    ],
  )

const SafetyCertificateOutlined = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }),
      h('path', { d: 'M9 12l2 2 4-4' }),
    ],
  )

const MobileOutlined = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('rect', { x: '5', y: '2', width: '14', height: '20', rx: '2', ry: '2' }),
      h('path', { d: 'M12 18h.01' }),
    ],
  )

const ApiOutlined = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('path', { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }),
      h('path', { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' }),
    ],
  )

const CheckIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [h('polyline', { points: '20 6 9 17 4 12' })],
  )

const TwitterIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('path', {
        d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
      }),
    ],
  )

const GithubIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('path', {
        d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
      }),
    ],
  )

// Features data
const features = ref([
  {
    icon: FormOutlined,
    title: '拖拽式设计',
    description: '简单拖拽即可创建专业表单，无需编写代码',
  },
  {
    icon: ThunderboltOutlined,
    title: '快速部署',
    description: '一键发布您的表单，立即开始收集数据',
  },
  {
    icon: AppstoreOutlined,
    title: '丰富组件',
    description: '50+ 预设组件满足各种表单需求',
  },
  {
    icon: SafetyCertificateOutlined,
    title: '数据安全',
    description: '企业级数据加密，保障您的信息安全',
  },
  {
    icon: MobileOutlined,
    title: '响应式设计',
    description: '在任何设备上都能完美展示您的表单',
  },
  {
    icon: ApiOutlined,
    title: 'API 集成',
    description: '轻松与第三方服务集成，实现数据流转',
  },
])

// Testimonials data
const testimonials = ref([
  {
    quote: 'EasyForm 帮助我们在一周内完成了原本需要一个月的表单开发工作，极大提高了工作效率。',
    name: '张经理',
    title: '某科技公司产品总监',
  },
  {
    quote: '作为一个非技术人员，我能够独立创建复杂的调查问卷，这在以前是不可能的。',
    name: '李女士',
    title: '市场研究专员',
  },
  {
    quote: 'EasyForm 的客户支持团队非常专业，他们帮助我们解决了所有问题。',
    name: '王先生',
    title: '创业公司 CEO',
  },
])
</script>

<style></style>
