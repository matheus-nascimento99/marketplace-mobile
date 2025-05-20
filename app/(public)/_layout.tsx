import { Stack } from 'expo-router'

import { Loading } from '@/components/ui/loading'
import { useAuth } from '@/hooks/use-auth'

export default function PublicLayout() {
  const { isLoadingUserData } = useAuth()
  return (
    <>
      {isLoadingUserData ? (
        <Loading />
      ) : (
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
      )}
    </>
  )
}
