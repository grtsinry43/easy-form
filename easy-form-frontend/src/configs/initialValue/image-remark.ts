import { v4 as uuidV4 } from 'uuid'
import { markRaw } from 'vue'
import ImageRemark from '@/components/materials/remark/image.vue'
import TitleEditor from '@/components/edit-items/title-editor.vue'
import DescEditor from '@/components/edit-items/desc-editor.vue'
import ImageUrlEditor from '@/components/edit-items/image-url-editor.vue'
import PositionEditor from '@/components/edit-items/position-editor.vue'
import SizeEditor from '@/components/edit-items/size-editor.vue'
import WeightEditor from '@/components/edit-items/weight-editor.vue'
import ItalicEditor from '@/components/edit-items/italic-editor.vue'
import ColorEditor from '@/components/edit-items/color-editor.vue'
import type { BaseComponentType, ComponentProperty } from '@/types/material.ts'
import { useTheme } from '@/utils/theme.ts'

export type ImageRemarkValue = {
  title: ComponentProperty & { value: string }
  desc: ComponentProperty & { value: string }
  imageUrl: ComponentProperty & { value: string }
  position: ComponentProperty & { value: string[]; currentValue: number }
  titleSize: ComponentProperty & { value: string[]; currentValue: number }
  descSize: ComponentProperty & { value: string[]; currentValue: number }
  titleWeight: ComponentProperty & { value: string[]; currentValue: number }
  descWeight: ComponentProperty & { value: string[]; currentValue: number }
  titleItalic: ComponentProperty & { value: string[]; currentValue: number }
  descItalic: ComponentProperty & { value: string[]; currentValue: number }
  titleColor: ComponentProperty & { value: string }
  descColor: ComponentProperty & { value: string }
}

export default function () {
  const { resolvedTheme } = useTheme()
  return {
    id: uuidV4(),
    component: markRaw(ImageRemark),
    type: 'image-remark',
    value: {
      title: {
        id: uuidV4(),
        value: '图片备注',
        isShow: true,
        type: 'title-editor',
        editComponent: markRaw(TitleEditor),
      },
      titleSize: {
        id: uuidV4(),
        currentValue: 0,
        value: ['22', '20', '18'],
        isShow: true,
        type: 'size-editor',
        editComponent: markRaw(SizeEditor),
      },
      titleWeight: {
        id: uuidV4(),
        currentValue: 1,
        value: ['正常', '加粗'],
        isShow: true,
        type: 'weight-editor',
        editComponent: markRaw(WeightEditor),
      },
      titleItalic: {
        id: uuidV4(),
        currentValue: 0,
        value: ['正常', '斜体'],
        isShow: true,
        type: 'italic-editor',
        editComponent: markRaw(ItalicEditor),
      },
      titleColor: {
        id: uuidV4(),
        value: resolvedTheme.value === 'dark' ? '#fff' : '#000',
        isShow: true,
        type: 'color-editor',
        editComponent: markRaw(ColorEditor),
      },
      desc: {
        id: uuidV4(),
        value: '添加一张图片作为补充说明',
        isShow: true,
        type: 'desc-editor',
        editComponent: markRaw(DescEditor),
      },
      descSize: {
        id: uuidV4(),
        currentValue: 0,
        value: ['16', '14', '12'],
        isShow: true,
        type: 'size-editor',
        editComponent: markRaw(SizeEditor),
      },
      descWeight: {
        id: uuidV4(),
        currentValue: 0,
        value: ['正常', '加粗'],
        isShow: true,
        type: 'weight-editor',
        editComponent: markRaw(WeightEditor),
      },
      descItalic: {
        id: uuidV4(),
        currentValue: 0,
        value: ['正常', '斜体'],
        isShow: true,
        type: 'italic-editor',
        editComponent: markRaw(ItalicEditor),
      },
      descColor: {
        id: uuidV4(),
        value: resolvedTheme.value === 'dark' ? '#ccc' : '#333',
        isShow: true,
        type: 'color-editor',
        editComponent: markRaw(ColorEditor),
      },
      imageUrl: {
        id: uuidV4(),
        value: '',
        isShow: true,
        type: 'image-url-editor',
        editComponent: markRaw(ImageUrlEditor),
      },
      position: {
        id: uuidV4(),
        currentValue: 0,
        value: ['左侧排列', '居中对齐'],
        isShow: true,
        type: 'position-editor',
        editComponent: markRaw(PositionEditor),
      },
    },
  } as BaseComponentType<ImageRemarkValue>
}
