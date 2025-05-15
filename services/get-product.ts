import { Product } from '@/dtos/product'
import { api } from '@/lib/api'

type GetProductServiceRequest = {
  productId: string
}

type GetProductServiceResponse = {
  product: Product
}

export const getProductService = async ({
  productId,
}: GetProductServiceRequest) => {
  const { data } = await api.get<GetProductServiceResponse>(
    `/products/${productId}`,
  )

  return data
}
