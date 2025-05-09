import { useRouter } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'

import { ArrowRight02Icon } from '@/assets/icons/arrow-right-02'
import Logo from '@/assets/images/logo'
import { Button } from '@/components/ui/button'

import { SignUpForm } from './sign-up-form'

export default function SignUp() {
  // Expo router hook for use in navigation
  const router = useRouter()

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-10 py-16">
        <View className="flex-col gap-8">
          <Logo />

          <View className="items-center gap-2">
            <Text className="font-heading text-heading-lg leading-tight text-gray-500">
              Crie sua conta
            </Text>
            <Text className="text-center font-body text-body-md leading-snug text-gray-300">
              Informe os seus dados pessoais e de acesso
            </Text>
          </View>
        </View>

        <View className="mb-5">
          <SignUpForm />
        </View>

        <View className="mt-auto gap-5">
          <Text className="font-body text-body-md leading-snug text-gray-300">
            Já tem uma conta?
          </Text>
          <Button variant="outline" onPress={() => router.back()}>
            <Text className="font-label text-action-md leading-snug text-orange-base">
              Acessar
            </Text>
            <ArrowRight02Icon className="stroke-orange-base" />
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
