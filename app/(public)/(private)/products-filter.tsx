import { Text, View } from 'react-native'

import Search01Icon from '@/assets/icons/search-01'
import * as Input from '@/components/ui/input'
import { useProducts } from '@/hooks/use-products'

import { ProductsFilterBottomSheet } from './products-filter-bottom-sheet'

export const ProductsFilter = () => {
  // Products context
  const { search, setSearch } = useProducts()

  return (
    <View className="space-y-1">
      <Text className="font-body text-body-sm leading-snug text-gray-500">
        Explore produtos
      </Text>

      <View className="flex flex-row gap-4">
        <Input.Root>
          <Input.Content>
            <Input.Prefix>
              <Search01Icon className="stroke-gray-200" />
            </Input.Prefix>
            <Input.ControlInput
              placeholder="Pesquisar"
              returnKeyType="done"
              value={search}
              onChangeText={setSearch}
            />
          </Input.Content>
        </Input.Root>

        <ProductsFilterBottomSheet />
      </View>
    </View>
  )
}
