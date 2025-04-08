import { CheckBoxTwotone, LocalPhoneRound } from '@vicons/material'
import { DrawText20Filled } from '@vicons/fluent'
import { FileSearchOutlined } from '@vicons/antd'
import { Chat, UserAvatar } from '@vicons/carbon'
import { ref, markRaw } from 'vue'

const componentTypes = ref([
  {
    id: 'select',
    title: '选择',
    icon: markRaw(CheckBoxTwotone),
    path: '/select',
    buttons: [
      { text: '单选题', id: 'single-choice', isPrimary: true },
      { text: '多选题', id: 'multiple-choice', isPrimary: false },
      { text: '下拉选择题', id: 'dropdown', isPrimary: false },
      { text: '图片单选题', id: 'image-single', isPrimary: false },
      { text: '图片多选题', id: 'image-multiple', isPrimary: false },
    ],
  },
  {
    id: 'input',
    title: '文本输入',
    icon: markRaw(DrawText20Filled),
    path: '/input',
    buttons: [],
  },
  {
    id: 'advanced',
    title: '高级题型',
    icon: markRaw(FileSearchOutlined),
    path: '/advanced',
    buttons: [],
  },
  {
    id: 'remark',
    title: '备注说明',
    icon: markRaw(Chat),
    path: '/remark',
    buttons: [],
  },
  {
    id: 'profile',
    title: '个人信息',
    icon: markRaw(UserAvatar),
    path: '/profile',
    buttons: [],
  },
  {
    id: 'contact',
    title: '联系方式',
    icon: markRaw(LocalPhoneRound),
    path: '/contact',
    buttons: [],
  },
])

export default componentTypes
