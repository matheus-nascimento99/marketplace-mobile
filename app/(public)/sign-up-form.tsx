import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { z } from 'zod'

import AccessIcon from '@/assets/icons/access'
import AlertCircleIcon from '@/assets/icons/alert-circle'
import { ArrowRight02Icon } from '@/assets/icons/arrow-right-02'
import CallIcon from '@/assets/icons/call'
import ImageUploadIcon from '@/assets/icons/image-upload'
import Mail02Icon from '@/assets/icons/mail-02'
import UserIcon from '@/assets/icons/user'
import ViewIcon from '@/assets/icons/view'
import ViewOffIcon from '@/assets/icons/view-off'
import { Button } from '@/components/ui/button'
import * as Input from '@/components/ui/input'
import { AppError } from '@/errors/app-error'
import { useAuth } from '@/hooks/use-auth'
import { uploadAttachment } from '@/services/upload-attachment'
import { formatPhoneNumber } from '@/utils/format-phone-number'

// Sign in schema validation
const signUpSchema = z
  .object({
    name: z.string().trim().min(1, 'Por favor, forneça seu nome completo'),
    phone: z.string().trim().min(1, 'Por favor, forneça seu nome completo'),
    email: z
      .string()
      .trim()
      .min(1, 'Por favor, forneça seu e-mail')
      .email('Por favor, forneça o e-mail no formato correto'),
    password: z.string().min(1, 'Por favor, forneça sua senha'),
    passwordConfirmation: z.string().min(1, 'Por favor, forneça sua senha'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export const SignUpForm = () => {
  // Auth context
  const { signUp } = useAuth()

  // Password and confirm password visible state
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [ispasswordConfirmationVisible, setpasswordConfirmationVisible] =
    useState(false)

  // Image state
  const [image, setImage] = useState<string | null>(null)

  // Attachment id state
  const [avatarId, setavatarId] = useState<string | null>(null)

  // Inputs refs
  const phoneNumberInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const passwordConfirmationInputRef = useRef<TextInput>(null)

  // Use form react hook form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  // Expo router hook for use in navigation
  const router = useRouter()

  // On submit function
  const onSubmit = async ({
    name,
    phone,
    email,
    password,
    passwordConfirmation,
  }: SignUpSchema) => {
    try {
      await signUp({
        email,
        password,
        name,
        phone,
        avatarId,
        passwordConfirmation,
      })

      showMessage({
        message: 'Sucesso',
        description: 'Vendedor criado com sucesso!',
        type: 'success',
      })

      router.navigate('/(public)')
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

  // Image picker function
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const userPermission = await ImagePicker.getMediaLibraryPermissionsAsync()

    if (!userPermission.granted) {
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }

    if (!result.assets) {
      return
    }

    try {
      const { attachments } = await uploadAttachment({
        attachment: result.assets[0],
      })

      setavatarId(attachments[0].id)
    } catch (error) {
      console.error('Erro ao realizar upload da imagem', error)
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : 'Não foi possível realizar o upload do arquivo, tente novamente mais tarde'

      showMessage({
        message: 'Erro',
        description,
        type: 'danger',
      })
    }
  }

  return (
    <View className="mt-8.5 gap-10">
      <View className="gap-5">
        <Pressable
          className="bg-shape size-30 m-auto flex items-center justify-center overflow-hidden rounded-xl"
          onPress={pickImage}
        >
          {image ? (
            <Image src={image} className="h-full w-full" alt="Profile image" />
          ) : (
            <ImageUploadIcon className="size-8 stroke-orange-base" />
          )}
        </Pressable>

        <Input.Root>
          <Input.Label>Nome</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <UserIcon className="stroke-gray-200" />
            </Input.Prefix>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.ControlInput
                  placeholder="Nome"
                  autoFocus
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    phoneNumberInputRef.current?.focus()
                  }}
                />
              )}
              name="name"
            />
          </Input.Content>
          {errors.name && (
            <Input.Error>
              <AlertCircleIcon className="size-4 stroke-danger" />
              <Text className="text-danger">{errors.name.message}</Text>
            </Input.Error>
          )}
        </Input.Root>

        <Input.Root>
          <Input.Label>Telefone</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <CallIcon className="stroke-gray-200" />
            </Input.Prefix>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.ControlInput
                  ref={phoneNumberInputRef}
                  placeholder="(00) 00000-0000"
                  keyboardType="phone-pad"
                  value={formatPhoneNumber(value)}
                  onChangeText={(text) => {
                    const digits = text.replace(/\D/g, '')
                    if (digits.length > 11) return

                    onChange(digits)
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    emailInputRef.current?.focus()
                  }}
                />
              )}
              name="phone"
            />
          </Input.Content>
          {errors.phone && (
            <Input.Error>
              <AlertCircleIcon className="size-4 stroke-danger" />
              <Text className="text-danger">{errors.phone.message}</Text>
            </Input.Error>
          )}
        </Input.Root>
      </View>

      <View className="gap-10">
        <View className="gap-5">
          <Text className="font-heading text-heading-sm leading-tight text-gray-500">
            Acesso
          </Text>

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
                    ref={emailInputRef}
                    placeholder="E-mail"
                    keyboardType="email-address"
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
                      placeholder="Senha"
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!isPasswordVisible}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        passwordConfirmationInputRef.current?.focus()
                      }}
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

          <Input.Root>
            <Input.Label>Confirmar senha</Input.Label>
            <View className="relative">
              <Input.Content>
                <Input.Prefix>
                  <AccessIcon className="stroke-gray-200" />
                </Input.Prefix>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input.ControlInput
                      ref={passwordConfirmationInputRef}
                      placeholder="Confirme a senha"
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!ispasswordConfirmationVisible}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                  name="passwordConfirmation"
                />
              </Input.Content>
              <TouchableOpacity
                onPress={() =>
                  setpasswordConfirmationVisible(!ispasswordConfirmationVisible)
                }
                className="absolute right-0 top-4 pl-4"
              >
                {ispasswordConfirmationVisible ? (
                  <ViewOffIcon className="stroke-gray-200" />
                ) : (
                  <ViewIcon className="stroke-gray-200" />
                )}
              </TouchableOpacity>
            </View>
            {errors.passwordConfirmation && (
              <Input.Error>
                <AlertCircleIcon className="size-4 stroke-danger" />
                <Text className="text-danger">
                  {errors.passwordConfirmation.message}
                </Text>
              </Input.Error>
            )}
          </Input.Root>
        </View>

        <Button disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
          <Text className="font-label text-action-md leading-snug text-white">
            {isSubmitting ? 'Carregando...' : 'Cadastrar'}
          </Text>
          <ArrowRight02Icon className="stroke-white" />
        </Button>
      </View>
    </View>
  )
}
