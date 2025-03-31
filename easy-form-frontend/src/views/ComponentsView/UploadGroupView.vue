<script setup lang="ts">
import Layout from './Layout.vue'
import UploadComponent from '../../components/survey-coms/UploadComponent.vue'
</script>

<template>
  <Layout>
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">基础上传</h3>
        <div class="grid grid-cols-1 gap-4">
          <UploadComponent label="单文件上传" />
          <UploadComponent label="多文件上传" multiple />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">文件限制</h3>
        <div class="grid grid-cols-1 gap-4">
          <UploadComponent 
            label="大小限制" 
            :maxSize="5"
            accept=".jpg,.jpeg,.png,.gif"
          />
          <UploadComponent 
            label="数量限制" 
            :maxCount="3"
            multiple
          />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">展示方式</h3>
        <div class="grid grid-cols-1 gap-4">
          <UploadComponent 
            label="文本列表" 
            listType="text"
            multiple
          />
          <UploadComponent 
            label="图片卡片" 
            listType="image-card"
            accept=".jpg,.jpeg,.png,.gif"
          />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">其他特性</h3>
        <div class="grid grid-cols-1 gap-4">
          <UploadComponent 
            label="必填项" 
            required 
          />
          <UploadComponent 
            label="禁用状态" 
            disabled 
          />
          <UploadComponent 
            label="隐藏预览" 
            :showPreviewButton="false"
            multiple
          />
          <UploadComponent 
            label="隐藏删除" 
            :showRemoveButton="false"
            multiple
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style> 