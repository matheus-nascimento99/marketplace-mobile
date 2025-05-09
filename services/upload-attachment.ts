import { ImagePickerAsset } from 'expo-image-picker'

import { api } from '@/lib/api'

type UploadAttachmentServiceRequest = {
  attachment: ImagePickerAsset
}

type UploadAttachmentServiceResponse = {
  attachments: {
    id: string
    url: string
  }[]
}

export const uploadAttachment = async ({
  attachment,
}: UploadAttachmentServiceRequest) => {
  const file = {
    name: attachment.fileName,
    type: attachment.mimeType,
    uri: attachment.uri,
  } as unknown as Blob

  const form = new FormData()
  form.append('files', file)

  const { data } = await api.post<UploadAttachmentServiceResponse>(
    '/attachments',
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  )

  return data
}
