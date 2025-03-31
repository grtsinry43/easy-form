export interface BaseSchema {
  type: string
  label: string
  required?: boolean
  disabled?: boolean
}

export interface InputSchema extends BaseSchema {
  type: 'input'
  placeholder?: string
  maxlength?: number
  showCount?: boolean
  inputType?: 'text' | 'password' | 'email' | 'tel'
}

export interface SelectSchema extends BaseSchema {
  type: 'select'
  options: Array<{
    label: string
    value: string | number
  }>
  multiple?: boolean
  placeholder?: string
  maxTagCount?: number
}

export interface DateSchema extends BaseSchema {
  type: 'date'
  dateType?: 'date' | 'datetime' | 'month' | 'year' | 'daterange'
  placeholder?: string
  clearable?: boolean
  format?: string
}

export interface NumberSchema extends BaseSchema {
  type: 'number'
  placeholder?: string
  min?: number
  max?: number
  step?: number
  precision?: number
  showButton?: boolean
}

export interface TextareaSchema extends BaseSchema {
  type: 'textarea'
  placeholder?: string
  maxlength?: number
  showCount?: boolean
  rows?: number
  autosize?: boolean | { minRows?: number; maxRows?: number }
}

export interface SwitchSchema extends BaseSchema {
  type: 'switch'
  size?: 'small' | 'medium' | 'large'
  round?: boolean
  checkedValue?: string | number | boolean
  uncheckedValue?: string | number | boolean
}

export interface RateSchema extends BaseSchema {
  type: 'rate'
  count?: number
  size?: 'small' | 'medium' | 'large'
  allowHalf?: boolean
  clearable?: boolean
  defaultValue?: number
}

export interface UploadSchema extends BaseSchema {
  type: 'upload'
  multiple?: boolean
  accept?: string
  maxSize?: number
  maxCount?: number
  listType?: 'text' | 'image' | 'image-card'
  showFileList?: boolean
  showPreviewButton?: boolean
  showRemoveButton?: boolean
}

export type FormSchema = 
  | InputSchema 
  | SelectSchema 
  | DateSchema 
  | NumberSchema 
  | TextareaSchema 
  | SwitchSchema 
  | RateSchema 
  | UploadSchema 