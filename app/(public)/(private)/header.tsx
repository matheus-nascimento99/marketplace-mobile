import { View } from 'react-native'

import { ProfileHeader } from './profile-header'

export const Header = () => {
  return (
    <View className="bg-white px-6 pb-6 pt-9">
      <ProfileHeader />
      <View></View>
    </View>
  )
}
