import type { ComponentProperty } from '@/types/material.ts'

export function getTextValue(props: ComponentProperty): string {
  return typeof props.value === 'string' ? props.value : ''
}

export function getStringValue(props: ComponentProperty): string[] {
  return Array.isArray(props.value) && props.value.every((item) => typeof item === 'string')
    ? props.value
    : []
}

export function getCurrentValue(props: ComponentProperty): number {
  return typeof props.currentValue === 'number' ? props.currentValue : 0
}

export function getStringValueByCurrentValue(props: ComponentProperty): string {
  if (Array.isArray(props.value) && typeof props.currentValue === 'number') {
    const currentValue = props.value[props.currentValue]
    return typeof currentValue === 'string' ? currentValue : ''
  }
  return typeof props.value === 'string' ? props.value : ''
}
