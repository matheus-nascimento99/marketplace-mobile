import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export default function Product() {
  const { id } = useLocalSearchParams()

  return <View className="flex-1 items-center justify-center"></View>
}
