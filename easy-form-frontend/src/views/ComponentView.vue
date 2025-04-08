<script setup lang="ts">
import componentTypes from '@/meta/component-meta.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToComponent = (typeId: string, buttonId: string) => {
  router.push(`/components/${typeId}/${buttonId}`)
}
</script>

<template>
  <div class="h-[calc(100vh-64px)] w-full">
    <n-split
      direction="horizontal"
      class="h-full w-full"
      :default-size="0.25"
      :resize-trigger-size="2"
      :min="0.2"
      :max="0.35"
    >
      <template #1>
        <nav class="p-4 h-full overflow-auto">
          <n-collapse arrow-placement="right" :default-expanded-names="['select']">
            <n-collapse-item v-for="type in componentTypes" :key="type.id" :name="type.id">
              <template #header>
                <n-icon class="mr-2">
                  <component :is="type.icon" />
                </n-icon>
                <div>{{ type.title }}</div>
              </template>
              <template #default>
                <n-flex v-if="type.buttons && type.buttons.length">
                  <n-button
                    v-for="btn in type.buttons"
                    :key="btn.id"
                    :type="btn.isPrimary ? 'primary' : undefined"
                    @click="navigateToComponent(type.id, btn.id)"
                  >
                    {{ btn.text }}
                  </n-button>
                </n-flex>
              </template>
            </n-collapse-item>
          </n-collapse>
        </nav>
      </template>
      <template #2>
        <n-split
          direction="horizontal"
          class="h-full w-full"
          :default-size="0.7"
          :resize-trigger-size="2"
          :min="0.5"
          :max="1"
        >
          <template #1>
            <div class="p-4 h-full overflow-auto">
              <router-view v-slot="{ Component, route }">
                <transition name="nested-transition" mode="out-in" appear>
                  <div>
                    <component :is="Component" :key="route.path" />
                  </div>
                </transition>
              </router-view>
            </div>
          </template>
          <template #2>
            <div class="p-4 h-full overflow-auto">6868</div>
          </template>
        </n-split>
      </template>
      <!--<template #resize-trigger>-->
      <!--  &lt;!&ndash;<div class="bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 w-1 h-full transition-all"></div>&ndash;&gt;-->
      <!--</template>-->
    </n-split>
  </div>
</template>

<style>
.nested-transition-enter-active,
.nested-transition-leave-active {
  transition: all 0.2s ease;
}

.nested-transition-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.nested-transition-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
