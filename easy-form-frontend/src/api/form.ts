import { request } from '@/api/request.ts'
import type { ComponentValue } from '@/stores/material-components.ts'
import type { FormDetail } from '@/views/EditorView.vue'

export const createForm = async ({
  title,
  description,
  type,
}: {
  title: string
  description: string
  type: string
}) => {
  return await request.post('/form/create', {
    title,
    description,
    type,
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

export const getFormById = async (formId: string): Promise<FormDetail> => {
  return await request.get(`/form/${formId}`)
}

export const getAllForms = async (): Promise<ComponentValue[]> => {
  return await request.get('/form')
}
