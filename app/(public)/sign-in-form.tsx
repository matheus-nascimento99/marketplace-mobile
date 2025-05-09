import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { z } from 'zod'

import AccessIcon from '@/assets/icons/access'
import AlertCircleIcon from '@/assets/icons/alert-circle'
import { ArrowRight02Icon } from '@/assets/icons/arrow-right-02'
import Mail02Icon from '@/assets/icons/mail-02'
import ViewIcon from '@/assets/icons/view'
import ViewOffIcon from '@/assets/icons/view-off'
import { Button } from '@/components/ui/button'
import * as Input from '@/components/ui/input'
import { AppError } from '@/errors/app-error'
import { useAuth } from '@/hooks/use-auth'

// Sign in schema validation
const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Por favor, forneça seu e-mail')
    .email('Por favor, forneça o e-mail no formato correto'),
  password: z.string().min(1, 'Por favor, forneça sua senha'),
})

type SignInSchema = z.infer<typeof signInSchema>

export const SignInForm = () => {
  // Auth context
  const { signIn } = useAuth()

  // Password visible state
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  // Password input ref
  const passwordInputRef = useRef<TextInput>(null)

  // Use form react hook form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Expo router hook for use in navigation
  const router = useRouter()

  // On submit function
  const onSubmit = async ({ email, password }: SignInSchema) => {
    try {
      await signIn({ email, password })

      router.navigate('/(public)/(private)')
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : 'Não foi possível realizar o login, tente novamente mais tarde'

      showMessage({
        message: 'Erro',
        description,
        type: 'danger',
      })
    }
  }

  return (
    <View className="mt-15 gap-10">
      <View className="gap-5">
        <Input.Root>
          <Input.Label>E-mail</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <Mail02Icon className="stroke-gray-200" />
            </Input.Prefix>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.ControlInput
                  placeholder="Seu e-mail cadastrado"
                  keyboardType="email-address"
                  autoFocus
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus()
                  }}
                />
              )}
              name="email"
            />
          </Input.Content>
          {errors.email && (
            <Input.Error>
              <AlertCircleIcon className="size-4 stroke-danger" />
              <Text className="text-danger">{errors.email.message}</Text>
            </Input.Error>
          )}
        </Input.Root>

        <Input.Root>
          <Input.Label>Senha</Input.Label>
          <View className="relative">
            <Input.Content>
              <Input.Prefix>
                <AccessIcon className="stroke-gray-200" />
              </Input.Prefix>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input.ControlInput
                    ref={passwordInputRef}
                    placeholder="Sua senha cadastrada"
                    returnKeyType="send"
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!isPasswordVisible}
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
                name="password"
              />
            </Input.Content>
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
              className="absolute right-0 top-4 pl-4"
            >
              {isPasswordVisible ? (
                <ViewOffIcon className="stroke-gray-200" />
              ) : (
                <ViewIcon className="stroke-gray-200" />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Input.Error>
              <AlertCircleIcon className="size-4 stroke-danger" />
              <Text className="text-danger">{errors.password.message}</Text>
            </Input.Error>
          )}
        </Input.Root>
      </View>
      <Button disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        <Text className="font-label text-action-md leading-snug text-white">
          {isSubmitting ? 'Carregando...' : 'Acessar'}
        </Text>
        <ArrowRight02Icon className="stroke-white" />
      </Button>
    </View>
  )
}
