import { api } from '@/lib/api'

type RegisterProductViewServiceRequest = {
  productId: string
}

export const registerProductViewService = async ({
  productId,
}: RegisterProductViewServiceRequest) => {
  await api.post(`/products/${productId}/views`)
}
