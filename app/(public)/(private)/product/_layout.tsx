import { Stack } from 'expo-router'

export default function ProductLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'fade_from_bottom',
        statusBarBackgroundColor: '#FBF4F4',
        statusBarAnimation: 'fade',
        statusBarTranslucent: true,
        statusBarStyle: 'dark',
      }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  )
}
