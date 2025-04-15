import { v4 as uuidV4 } from 'uuid'
import { markRaw } from 'vue'
import Dropdown from '@/components/materials/select/dropdown.vue'
import TitleEditor from '@/components/edit-items/title-editor.vue'
import DescEditor from '@/components/edit-items/desc-editor.vue'
import OptionsEditor from '@/components/edit-items/options-editor.vue'
import PlaceholderEditor from '@/components/edit-items/placeholder-editor.vue'
import SizeEditor from '@/components/edit-items/size-editor.vue'
import WeightEditor from '@/components/edit-items/weight-editor.vue'
import ItalicEditor from '@/components/edit-items/italic-editor.vue'
import ColorEditor from '@/components/edit-items/color-editor.vue'
import type { BaseComponentType, ComponentProperty } from '@/types/material.ts'
import { useTheme } from '@/utils/theme.ts'

export type DropdownValue = {
  title: ComponentProperty & { value: string }
  desc: ComponentProperty & { value: string }
  options: ComponentProperty & { value: string[]; currentValue: number }
  placeholder: ComponentProperty & { value: string }
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
    component: markRaw(Dropdown),
    type: 'dropdown',
    value: {
      title: {
        id: uuidV4(),
        value: '下拉选择题默认标题',
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
        value: '有的时候，或许你更喜欢下拉选择的方式来做出选择',
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
      options: {
        id: uuidV4(),
        value: ['选项1', '选项2', '选项3', '选项4'],
        currentValue: 0,
        isShow: true,
        type: 'options-editor',
        editComponent: markRaw(OptionsEditor),
      },
      placeholder: {
        id: uuidV4(),
        value: '那就来选一选吧',
        isShow: true,
        type: 'placeholder-editor',
        editComponent: markRaw(PlaceholderEditor),
      },
    },
  } as BaseComponentType<DropdownValue>
}
