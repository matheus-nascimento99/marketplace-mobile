import { View } from 'react-native'

import { ProductsFilter } from './products-filter'
import { ProfileHeader } from './profile-header'

export const Header = () => {
  return (
    <View className="gap-8 rounded-b-2xl bg-white px-6 pb-6 pt-9">
      <ProfileHeader />
      <ProductsFilter />
    </View>
  )
}
