// 工具库
import type { TextProps, OptionsProps } from '@/types'

export function getTextValue(props: TextProps) {
  return props.value
}

export function getStringValue(props: OptionsProps) {
  return props.value
}

export function getCurrentValue(props: OptionsProps) {
  return props.currentValue
}

export function getStringValueByCurrentValue(props: OptionsProps): string | undefined {
  const currentValue = props.value[props.currentValue]
  if (typeof currentValue === 'string') {
    return currentValue
  } else if (typeof currentValue === 'object' && 'Value' in currentValue) {
    return currentValue.Value
  }
  return undefined
}
