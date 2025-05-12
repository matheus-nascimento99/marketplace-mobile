import { Text, View } from 'react-native'

import { Skeleton } from '@/components/ui/skeleton'
import { useProducts } from '@/hooks/use-products'

import { ProductCard } from './product-card'

export const ProductsList = () => {
  const { products } = useProducts()

  return (
    <View className="mx-4 flex flex-row flex-wrap">
      {products ? (
        <>
          {products.length > 0 ? (
            products.map((product) => (
              <View className="w-1/2 p-1" key={product.id}>
                <ProductCard product={product} />
              </View>
            ))
          ) : (
            <Text className="m-auto text-center font-body text-body-md text-gray-500">
              Nenhum produto encontrado
            </Text>
          )}
        </>
      ) : (
        Array.from({ length: 8 }).map((_, index) => (
          <View className="w-1/2 p-1" key={index}>
            <Skeleton className="h-36 w-full rounded-lg" speed={4} />
          </View>
        ))
      )}
    </View>
  )
}
