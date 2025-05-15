import { Stack } from 'expo-router'

import { AuthContextProvider } from '@/contexts/auth'

export default function PublicLayout() {
  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          statusBarAnimation: 'fade',
          statusBarTranslucent: true,
          statusBarStyle: 'dark',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-up" />
      </Stack>
    </AuthContextProvider>
  )
}
