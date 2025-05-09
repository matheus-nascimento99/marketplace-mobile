import { useRouter } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'

import { ArrowRight02Icon } from '@/assets/icons/arrow-right-02'
import Logo from '@/assets/images/logo'
import { Button } from '@/components/ui/button'

import { SignInForm } from './sign-in-form'

export default function SignIn() {
  // Expo router hook for use in navigation
  const router = useRouter()

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-10 py-16">
        <View className="flex-col gap-8">
          <Logo />

          <View className="items-center gap-2">
            <Text className="font-heading text-heading-lg leading-tight text-gray-500">
              Acesse sua conta
            </Text>
            <Text className="text-center font-body text-body-md leading-snug text-gray-300">
              Informe seu e-mail e senha para entrar
            </Text>
          </View>
        </View>

        <View className="mb-5">
          <SignInForm />
        </View>

        <View className="mt-auto gap-5">
          <Text className="font-body text-body-md leading-snug text-gray-300">
            Ainda não tem uma conta?
          </Text>
          <Button
            variant="outline"
            onPress={() => router.navigate('/(public)/sign-up')}
          >
            <Text className="font-label text-action-md leading-snug text-orange-base">
              Cadastrar
            </Text>
            <ArrowRight02Icon className="stroke-orange-base" />
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
