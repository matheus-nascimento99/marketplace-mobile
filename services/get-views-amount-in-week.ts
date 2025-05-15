import { api } from '@/lib/api'

type GetViewsAmountInWeekServiceRequest = {
  productId: string
}
type GetViewsAmountInWeekServiceResponse = {
  amount: number
}

export const getViewsAmountInWeekService = async ({
  productId,
}: GetViewsAmountInWeekServiceRequest) => {
  const { data } = await api.get<GetViewsAmountInWeekServiceResponse>(
    `/products/${productId}/metrics/views`,
  )

  return data
}
