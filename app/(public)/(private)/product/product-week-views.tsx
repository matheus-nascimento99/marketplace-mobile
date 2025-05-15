import { Text, View } from 'react-native'

import ChartHistogramIcon from '@/assets/icons/chart-histogram'

type ProductWeekViewsProps = {
  views: number
}

export const ProductWeekViews = ({ views }: ProductWeekViewsProps) => {
  return (
    <View className="flex flex-row items-center gap-3 rounded-card bg-blue-light p-3">
      <View className="flex size-9 items-center justify-center rounded-md bg-blue-dark">
        <ChartHistogramIcon className="size-5 stroke-white" />
      </View>
      <Text className="font-body text-body-xs leading-snug text-gray-400">
        <Text className="font-bold">
          {views} {views > 1 ? 'pessoas' : 'pessoa'}
        </Text>{' '}
        {views > 1 ? 'visualizaram' : 'visualizou'} este produto nos últimos 7
        dias
      </Text>
    </View>
  )
}
