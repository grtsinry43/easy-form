<script setup lang="ts">
import { useMaterialStore } from '@/stores/material-components.ts'
import { provide } from 'vue'

const store = useMaterialStore()

const updateVal = (key: string, value?: string | number | boolean | object ) => {
  console.log('updateVal', key, value)
  store.updateComponentState(key, value)
}
provide('updateVal', updateVal)
</script>

<template>
  <transition name="nested-transition" mode="out-in" appear>
    <div>
      <div
        v-for="[key, property] in Object.entries(
          store.components[store.currentMaterialComponent].value,
        )"
        :key="key"
        :class="{
          'inline-block mb-2 mr-2': [
            'weight-editor',
            'italic-editor',
            'color-editor',
          ].includes(property.type),
        }"
      >
        <component
          v-if="property.isShow"
          :is="property.editComponent"
          :value="property.value"
          :configKey="key"
          :currentValue="property.currentValue"
        />
      </div>
    </div>
  </transition>
</template>

<style scoped>
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
