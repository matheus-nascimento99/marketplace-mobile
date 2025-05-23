import { useRouter } from 'expo-router'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { ArrowRight02Icon } from '@/assets/icons/arrow-right-02'
import Logo from '@/assets/images/logo'
import { Button } from '@/components/ui/button'

import { SignUpForm } from './sign-up-form'

export default function SignUp() {
  const router = useRouter()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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

            <View className="mb-5 flex-1">
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
