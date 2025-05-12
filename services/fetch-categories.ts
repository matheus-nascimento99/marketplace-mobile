import { Category } from '@/dtos/category'
import { api } from '@/lib/api'

type FetchCategoriesServiceResponse = {
  categories: Category[]
}

export const fetchCategoriesService = async () => {
  const { data } = await api.get<FetchCategoriesServiceResponse>('/categories')

  return data
}
