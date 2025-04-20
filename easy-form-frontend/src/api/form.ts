import { request } from '@/api/request.ts'
import type { ComponentValue } from '@/stores/material-components.ts'

export const createForm = async ({
  meta,
  data,
}: {
  meta: {
    title: string
    description: string
    coverImage: string
    formId: string
    formType: string
  }
  data: ComponentValue[]
}) => {
  return await request.post('/form/create', {
    title: meta.title,
    description: meta.description,
    type: meta.formType,
    cover: meta.coverImage,
    value: JSON.stringify(data),
  })
}

export const updateForm = async ({
  id,
  meta,
  data,
}: {
  id: string
  meta: {
    title: string
    description: string
    coverImage: string
    formId: string
    formType: string
  }
  data: ComponentValue[]
}) => {
  return await request.put(`/form/update/${id}`, {
    title: meta.title,
    description: meta.description,
    cover: meta.coverImage,
    value: JSON.stringify(data),
  })
}

export const getFormById = async (formId: string) => {
  return await request.get(`/form/${formId}`)
}
