import { Image, Pressable, Text, View } from 'react-native'

import { Product } from '@/dtos/product'

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Pressable className="w-full rounded-lg bg-white p-1">
      <Image
        src={product.attachments[0].url.replace('localhost', '192.168.1.13')}
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
