import { Seller } from '@/dtos/seller'
import { api } from '@/lib/api'

type GetProfileServiceResponse = {
  seller: Seller
}

export const getProfileService = async () => {
  const { data } = await api.get<GetProfileServiceResponse>('/sellers/me')

  return data
}
