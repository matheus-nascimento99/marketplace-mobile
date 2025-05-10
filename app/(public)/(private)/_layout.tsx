import { Tabs } from 'expo-router'
import { Text } from 'react-native'

import Store04Icon from '@/assets/icons/store-04'
import UserIcon from '@/assets/icons/user'

export default function PrivateLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 76, paddingTop: 4 },
        tabBarActiveTintColor: '#F24D0D',
        sceneStyle: { backgroundColor: '#FBF4F4' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Produtos',
          tabBarIcon: (state) => {
            return (
              <Store04Icon
                className={
                  !state.focused ? 'stroke-gray-100' : 'stroke-orange-base'
                }
              />
            )
          },
          tabBarLabel: (state) => {
            return (
              <Text
                className={`font-label ${state.focused ? 'text-orange-base' : 'text-gray-100'} text-label-sm uppercase leading-tight`}
              >
                {state.children}
              </Text>
            )
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: (state) => {
            return (
              <UserIcon
                className={
                  !state.focused ? 'stroke-gray-100' : 'stroke-orange-base'
                }
              />
            )
          },
          tabBarLabel: (state) => {
            return (
              <Text
                className={`font-label ${state.focused ? 'text-orange-base' : 'text-gray-100'} text-label-sm uppercase leading-tight`}
              >
                {state.children}
              </Text>
            )
          },
        }}
      />
    </Tabs>
  )
}
