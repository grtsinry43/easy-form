import type { ComponentProperty } from '@/types/material.ts'

export function getTextValue(props: ComponentProperty | undefined): string {
  if (!props) return ''
  return typeof props.value === 'string' ? props.value : ''
}

export function getStringValue(props: ComponentProperty | undefined): string[] {
  if (!props) return []
  return Array.isArray(props.value) && props.value.every((item) => typeof item === 'string')
    ? props.value
    : []
}

export function getCurrentValue(props: ComponentProperty | undefined): number {
  if (!props) return 0
  return typeof props.currentValue === 'number' ? props.currentValue : 0
}

export function getStringValueByCurrentValue(props: ComponentProperty | undefined): string {
  if (!props) return ''
  if (Array.isArray(props.value) && typeof props.currentValue === 'number') {
    const currentValue = props.value[props.currentValue]
    return typeof currentValue === 'string' ? currentValue : ''
  }
  return typeof props.value === 'string' ? props.value : ''
}
