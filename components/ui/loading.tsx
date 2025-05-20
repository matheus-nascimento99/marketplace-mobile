import { ActivityIndicator, View } from 'react-native'

export const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={36} color={'#F24D0D'} />
    </View>
  )
}
