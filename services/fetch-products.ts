import { Product } from '@/dtos/product'
import { api } from '@/lib/api'

type FetchProductsServiceRequest = {
  search: string
  initialPrice: string
  finalPrice: string
  categoryId: string
}

type FetchProductsServiceResponse = {
  products: Product[]
  total: number
  next: number | null
  prev: number | null
}

export const fetchProductsService = async ({
  search,
  initialPrice,
  finalPrice,
  categoryId,
}: FetchProductsServiceRequest) => {
  const params = new URLSearchParams()

  if (search) {
    params.append('search', search)
  }

  if (initialPrice) {
    params.append('initial_price', initialPrice)
  }

  if (finalPrice) {
    params.append('final_price', finalPrice)
  }

  if (categoryId) {
    params.append('category_id', categoryId)
  }

  const { data } = await api.get<FetchProductsServiceResponse>('/products', {
    params,
  })

  return data
}
