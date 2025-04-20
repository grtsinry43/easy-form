<script setup lang="ts">
import { Delete24Regular, DocumentEdit20Regular } from '@vicons/fluent'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

const message = useMessage()
const router = useRouter()
</script>

<template>
  <main class="mt-8">
    <n-h1 class="text-center w-full">EasyForm 零代码表单生成器</n-h1>
    <div class="flex m-8">
      <n-button type="success" class="mr-4"> 创建表单</n-button>
      <n-button type="default"> 所有表单</n-button>
    </div>
    <div class="grid grid-cols-4 m-8 gap-6">
      <n-card title="新建问卷1" hoverable>
        <n-image width="100" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <div class="mt-4">问卷的备注，假装写了很多很多</div>
        <n-space class="mt-4">
          <n-tag :bordered="false"> 爱在西元前</n-tag>
          <n-tag :bordered="false" type="success"> 不该</n-tag>
          <n-tag :bordered="false" type="warning"> 超人不会飞</n-tag>
          <n-tag :bordered="false" type="error"> 手写的从前</n-tag>
          <n-tag :bordered="false" type="info"> 哪里都是你</n-tag>
        </n-space>
        <n-space class="mt-4 flex" justify="end">
          <n-button
            strong
            secondary
            circle
            type="info"
            @click="
              () => {
                message.success('开始编辑，正在初始化编辑器')
                router.push('/edit/1')
              }
            "
          >
            <template #icon>
              <n-icon>
                <DocumentEdit20Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon>
                <Delete24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>
      <n-card title="新建问卷2" hoverable>
        <n-image width="100" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <div class="mt-4">问卷的备注，假装写了很多很多</div>
        <n-space class="mt-4">
          <n-tag :bordered="false"> 爱在西元前</n-tag>
          <n-tag :bordered="false" type="success"> 不该</n-tag>
          <n-tag :bordered="false" type="warning"> 超人不会飞</n-tag>
          <n-tag :bordered="false" type="error"> 手写的从前</n-tag>
          <n-tag :bordered="false" type="info"> 哪里都是你</n-tag>
        </n-space>
        <n-space class="mt-4 flex" justify="end">
          <n-button strong secondary circle type="info">
            <template #icon>
              <n-icon>
                <DocumentEdit20Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon>
                <Delete24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>
      <n-card title="新建问卷2" hoverable>
        <n-image width="100" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <div class="mt-4">问卷的备注，假装写了很多很多</div>
        <n-space class="mt-4">
          <n-tag :bordered="false"> 爱在西元前</n-tag>
          <n-tag :bordered="false" type="success"> 不该</n-tag>
          <n-tag :bordered="false" type="warning"> 超人不会飞</n-tag>
          <n-tag :bordered="false" type="error"> 手写的从前</n-tag>
          <n-tag :bordered="false" type="info"> 哪里都是你</n-tag>
        </n-space>
        <n-space class="mt-4 flex" justify="end">
          <n-button strong secondary circle type="info">
            <template #icon>
              <n-icon>
                <DocumentEdit20Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon>
                <Delete24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>
      <n-card title="新建问卷2" hoverable>
        <n-image width="100" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <div class="mt-4">问卷的备注，假装写了很多很多</div>
        <n-space class="mt-4">
          <n-tag :bordered="false"> 爱在西元前</n-tag>
          <n-tag :bordered="false" type="success"> 不该</n-tag>
          <n-tag :bordered="false" type="warning"> 超人不会飞</n-tag>
          <n-tag :bordered="false" type="error"> 手写的从前</n-tag>
          <n-tag :bordered="false" type="info"> 哪里都是你</n-tag>
        </n-space>
        <n-space class="mt-4 flex" justify="end">
          <n-button strong secondary circle type="info">
            <template #icon>
              <n-icon>
                <DocumentEdit20Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon>
                <Delete24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>
      <n-card title="新建问卷2" hoverable>
        <n-image width="100" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <div class="mt-4">问卷的备注，假装写了很多很多</div>
        <n-space class="mt-4">
          <n-tag :bordered="false"> 爱在西元前</n-tag>
          <n-tag :bordered="false" type="success"> 不该</n-tag>
          <n-tag :bordered="false" type="warning"> 超人不会飞</n-tag>
          <n-tag :bordered="false" type="error"> 手写的从前</n-tag>
          <n-tag :bordered="false" type="info"> 哪里都是你</n-tag>
        </n-space>
        <n-space class="mt-4 flex" justify="end">
          <n-button strong secondary circle type="info">
            <template #icon>
              <n-icon>
                <DocumentEdit20Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon>
                <Delete24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>
      <n-card title="新建问卷2" hoverable>
        <n-image width="100" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <div class="mt-4">问卷的备注，假装写了很多很多</div>
        <n-space class="mt-4">
          <n-tag :bordered="false"> 爱在西元前</n-tag>
          <n-tag :bordered="false" type="success"> 不该</n-tag>
          <n-tag :bordered="false" type="warning"> 超人不会飞</n-tag>
          <n-tag :bordered="false" type="error"> 手写的从前</n-tag>
          <n-tag :bordered="false" type="info"> 哪里都是你</n-tag>
        </n-space>
        <n-space class="mt-4 flex" justify="end">
          <n-button strong secondary circle type="info">
            <template #icon>
              <n-icon>
                <DocumentEdit20Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon>
                <Delete24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>
      <n-card title="新建问卷2" hoverable>
        <n-image width="100" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <div class="mt-4">问卷的备注，假装写了很多很多</div>
        <n-space class="mt-4">
          <n-tag :bordered="false"> 爱在西元前</n-tag>
          <n-tag :bordered="false" type="success"> 不该</n-tag>
          <n-tag :bordered="false" type="warning"> 超人不会飞</n-tag>
          <n-tag :bordered="false" type="error"> 手写的从前</n-tag>
          <n-tag :bordered="false" type="info"> 哪里都是你</n-tag>
        </n-space>
        <n-space class="mt-4 flex" justify="end">
          <n-button strong secondary circle type="info">
            <template #icon>
              <n-icon>
                <DocumentEdit20Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon>
                <Delete24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>
      <n-card title="新建问卷2" hoverable>
        <n-image width="100" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <div class="mt-4">问卷的备注，假装写了很多很多</div>
        <n-space class="mt-4">
          <n-tag :bordered="false"> 爱在西元前</n-tag>
          <n-tag :bordered="false" type="success"> 不该</n-tag>
          <n-tag :bordered="false" type="warning"> 超人不会飞</n-tag>
          <n-tag :bordered="false" type="error"> 手写的从前</n-tag>
          <n-tag :bordered="false" type="info"> 哪里都是你</n-tag>
        </n-space>
        <n-space class="mt-4 flex" justify="end">
          <n-button strong secondary circle type="info">
            <template #icon>
              <n-icon>
                <DocumentEdit20Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button strong secondary circle type="error">
            <template #icon>
              <n-icon>
                <Delete24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-card>
    </div>
  </main>
</template>
