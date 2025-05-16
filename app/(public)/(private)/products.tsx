import { View } from 'react-native'

import { ProductsContextProvider } from '@/contexts/products'

import { Header } from './header'
import { ProductsList } from './products-list'

export default function Products() {
  return (
    <View className="flex-1 gap-3">
      <ProductsContextProvider>
        <Header />
        <ProductsList />
      </ProductsContextProvider>
    </View>
  )
}
