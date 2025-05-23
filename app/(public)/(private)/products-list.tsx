import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'

import { Skeleton } from '@/components/ui/skeleton'
import { useProducts } from '@/hooks/use-products'

import { ProductCard } from './product-card'

export const ProductsList = () => {
  // Products list
  const { products } = useProducts()

  // use query client instance
  const queryClient = useQueryClient()

  // Refresh list control state
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient
      .resetQueries({
        queryKey: ['fetch-products'],
      })
      .finally(() => setRefreshing(false))
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 50,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="px-4"
    >
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
    </ScrollView>
  )
}
