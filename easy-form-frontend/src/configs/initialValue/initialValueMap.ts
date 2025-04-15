// 该文件用于定义默认状态的映射表
import singleChoiceInitialValue from './single-choice.ts'
import singleLineInitialValue from './single-line.ts'
import multiLineInitialValue from './multi-line.ts'
import textRemarkInitialValue from './text-remark.ts'
import imageRemarkInitialValue from './image-remark.ts'
import ratingInitialValue from './rating.ts'
import timeInitialValue from './time.ts'
import dropdownInitialValue from './dropdown.ts'
import multipleChoiceInitialValue from './multiple-choice.ts'
import imageSingleInitialValue from './image-single.ts'
import imageMultipleInitialValue from './image-multiple.ts'

import type { SingleChoiceValue } from './single-choice.ts'
import type { SingleLineValue } from './single-line.ts'
import type { MultiLineValue } from './multi-line.ts'
import type { TextRemarkValue } from './text-remark.ts'
import type { ImageRemarkValue } from './image-remark.ts'
import type { RatingValue } from './rating.ts'
import type { TimeValue } from './time.ts'
import type { DropdownValue } from './dropdown.ts'
import type { MultipleChoiceValue } from './multiple-choice.ts'
import type { ImageSingleValue } from './image-single.ts'
import type { ImageMultipleValue } from './image-multiple.ts'

// 定义组件类型映射
export type ComponentValueMap = {
  'single-choice': SingleChoiceValue
  'single-line': SingleLineValue
  'multi-line': MultiLineValue
  'text-remark': TextRemarkValue
  'image-remark': ImageRemarkValue
  rating: RatingValue
  time: TimeValue
  dropdown: DropdownValue
  'multiple-choice': MultipleChoiceValue
  'image-single': ImageSingleValue
  'image-multiple': ImageMultipleValue
}

export const initialValueMap = {
  'single-choice': singleChoiceInitialValue,
  'single-line': singleLineInitialValue,
  'multi-line': multiLineInitialValue,
  'text-remark': textRemarkInitialValue,
  'image-remark': imageRemarkInitialValue,
  rating: ratingInitialValue,
  time: timeInitialValue,
  dropdown: dropdownInitialValue,
  'multiple-choice': multipleChoiceInitialValue,
  'image-single': imageSingleInitialValue,
  'image-multiple': imageMultipleInitialValue,
}
