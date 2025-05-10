import '@/global.css'
import '@/components/nativewind-interop'

import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import FlashMessage from 'react-native-flash-message'
import { SafeAreaView } from 'react-native-safe-area-context'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { queryClient } from '@/lib/tanstack-query'

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'DMSans-Bold': require('@/assets/fonts/DMSans-Bold.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <SafeAreaView className="bg-back flex-1">
          <Slot />
          <FlashMessage position="top" floating />
        </SafeAreaView>
      </QueryClientProvider>
    </GluestackUIProvider>
  )
}
