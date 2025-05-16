import { useRouter } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'

import { Product } from '@/dtos/product'
import { env } from '@/env'

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Expo router hook for use in navigation
  const router = useRouter()

  return (
    <Pressable
      className="w-full rounded-lg bg-white p-1"
      onPress={() =>
        router.navigate(`/(public)/(private)/product/${product.id}`)
      }
    >
      <Image
        src={product.attachments[0].url.replace(
          'localhost',
          env.EXPO_PUBLIC_API_IP,
        )}
        alt="Product image"
        className="h-24 w-full rounded-lg object-contain"
      />

      <View className="p-1">
        <Text className="font-body text-body-xs leading-snug text-gray-400">
          {product.title}
        </Text>
        <Text className="font-heading text-heading-xs leading-tight text-gray-500">
          {(product.priceInCents / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>
      </View>
    </Pressable>
  )
}
