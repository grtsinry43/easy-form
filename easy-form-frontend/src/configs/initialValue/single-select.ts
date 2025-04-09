import { v4 as uuidV4 } from 'uuid'
import { markRaw } from 'vue'
import SingleChoice from '@/components/materials/select/single-choice.vue'
import TitleEditor from '@/components/edit-items/title-editor.vue'
import DescEditor from '@/components/edit-items/desc-editor.vue'
import OptionsEditor from '@/components/edit-items/options-editor.vue'
import PositionEditor from '@/components/edit-items/position-editor.vue'
import SizeEditor from '@/components/edit-items/size-editor.vue'
import WeightEditor from '@/components/edit-items/weight-editor.vue'
import ItalicEditor from '@/components/edit-items/italic-editor.vue'
import ColorEditor from '@/components/edit-items/color-editor.vue'

export default function () {
  return {
    id: uuidV4(),
    com: markRaw(SingleChoice),
    type: 'single-select',
    value: {
      title: {
        id: uuidV4(),
        value: '单选题默认标题',
        isShow: true,
        name: 'title-editor',
        editCom: markRaw(TitleEditor),
      },
      desc: {
        id: uuidV4(),
        value: '单选题默认描述',
        isShow: true,
        name: 'desc-editor',
        editCom: markRaw(DescEditor),
      },
      options: {
        id: uuidV4(),
        value: ['默认选项1', '默认选项2'],
        currentValue: 0,
        isShow: true,
        name: 'options-editor',
        editCom: markRaw(OptionsEditor),
      },
      position: {
        id: uuidV4(),
        currentValue: 0,
        value: ['左对齐', '居中对齐'],
        isShow: true,
        name: 'position-editor',
        editCom: markRaw(PositionEditor),
      },
      titleSize: {
        id: uuidV4(),
        currentValue: 0,
        value: ['22', '20', '18'],
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      descSize: {
        id: uuidV4(),
        currentValue: 0,
        value: ['16', '14', '12'],
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      titleWeight: {
        id: uuidV4(),
        currentValue: 1,
        value: ['加粗', '正常'],
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      descWeight: {
        id: uuidV4(),
        currentValue: 1,
        value: ['加粗', '正常'],
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      titleItalic: {
        id: uuidV4(),
        currentValue: 1,
        value: ['斜体', '正常'],
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      descItalic: {
        id: uuidV4(),
        currentValue: 1,
        value: ['斜体', '正常'],
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      titleColor: {
        id: uuidV4(),
        value: '#000',
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
      descColor: {
        id: uuidV4(),
        value: '#909399',
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
    },
  }
}
