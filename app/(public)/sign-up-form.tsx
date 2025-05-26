import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  ActivityIndicator,
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
import { Seller } from '@/dtos/seller'
import { env } from '@/env'
import { AppError } from '@/errors/app-error'
import { useAuth } from '@/hooks/use-auth'
import { editUserService } from '@/services/edit-user'
import { uploadAttachmentService } from '@/services/upload-attachment'
import { formatPhoneNumber } from '@/utils/format-phone-number'

type SignUpProps = {
  profile?: Seller
}

// Common fields for both schemas
const commonFields = {
  name: z
    .string()
    .trim()
    .min(1, 'Por favor, forneça seu nome completo')
    .refine((value) => value.split(' ').length > 1, {
      message: 'Por favor, forneça seu nome completo',
    }),
  phone: z.string().trim().min(1, 'Por favor, forneça seu telefone'),
  email: z
    .string()
    .trim()
    .min(1, 'Por favor, forneça seu e-mail')
    .email('Por favor, forneça o e-mail no formato correto'),
}

// Schema for new users - passwords required
const newUserSchema = z
  .object({
    ...commonFields,
    password: z
      .string()
      .min(8, 'Por favor, forneça sua senha com no mínimo 8 caracteres'),
    passwordConfirmation: z
      .string()
      .min(8, 'Por favor, forneça sua senha com no mínimo 8 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  })

// Schema for existing users - passwords optional
const existingUserSchema = z
  .object({
    ...commonFields,
    password: z
      .string()
      .min(8, 'Por favor, forneça sua senha com no mínimo 8 caracteres')
      .optional()
      .or(z.literal('')),
    passwordConfirmation: z
      .string()
      .min(8, 'Por favor, forneça sua senha com no mínimo 8 caracteres')
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) => {
      // If both fields are empty strings or undefined, validation passes
      if (
        (!data.password || data.password === '') &&
        (!data.passwordConfirmation || data.passwordConfirmation === '')
      ) {
        return true
      }
      // Otherwise passwords must match
      return data.password === data.passwordConfirmation
    },
    {
      message: 'As senhas não coincidem',
      path: ['passwordConfirmation'],
    },
  )

// Type for form data based on whether we're editing a profile or creating a new user
type NewUserSchema = z.infer<typeof newUserSchema>
type ExistingUserSchema = z.infer<typeof existingUserSchema>

export const SignUpForm = ({ profile }: SignUpProps) => {
  // query client
  const queryClient = useQueryClient()

  // Form data type - depends on presence of profile
  type FormData = typeof profile extends undefined
    ? NewUserSchema
    : ExistingUserSchema

  // Auth context
  const { signUp } = useAuth()

  // Password and confirm password visible state
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [ispasswordConfirmationVisible, setpasswordConfirmationVisible] =
    useState(false)

  // Image state
  const [image, setImage] = useState<string | null>(
    profile && profile.avatar
      ? profile.avatar.url.replace('localhost', env.EXPO_PUBLIC_API_IP)
      : null,
  )

  // Attachment id state
  const [avatarId, setavatarId] = useState<string | null>(null)

  // Inputs refs
  const phoneNumberInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const passwordConfirmationInputRef = useRef<TextInput>(null)

  // Use form react hook form - use appropriate schema based on profile
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<FormData>({
    resolver: zodResolver(profile ? existingUserSchema : newUserSchema),
    defaultValues: {
      name: profile ? profile.name : '',
      phone: profile ? profile.phone : '',
      email: profile ? profile.email : '',
      password: '',
      passwordConfirmation: '',
    } as FormData,
  })

  // Expo router hook for use in navigation
  const router = useRouter()

  // On submit function
  const onSubmit = async (data: FormData) => {
    try {
      if (!profile) {
        // For new users (using required password fields)
        await signUp({
          email: data.email,
          // Safe cast because password is required for new users
          password: data.password as string,
          name: data.name,
          phone: data.phone,
          avatarId,
          passwordConfirmation: data.passwordConfirmation as string,
        })
      } else {
        // For existing users (passwords might be optional)
        const userData: {
          email: string
          name: string
          phone: string
          avatarId: string | null
          password?: string
        } = {
          email: data.email,
          name: data.name,
          phone: data.phone,
          avatarId,
        }

        // Only include password if it's a non-empty string
        if (data.password && data.password.trim() !== '') {
          userData.password = data.password
        }

        await editUserService(userData)

        resetField('password')
        resetField('passwordConfirmation')
      }

      showMessage({
        message: 'Sucesso',
        description: `Usuário ${profile ? 'atualizado' : 'criado'} com sucesso!`,
        type: 'success',
      })

      if (profile) {
        return queryClient.invalidateQueries({
          queryKey: ['get-profile'],
        })
      }

      router.navigate('/(public)')
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : 'Não foi possível realizar esta ação, tente novamente mais tarde'

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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      return showMessage({
        message: 'Atenção',
        description:
          'Para escolher o avatar, precisamos de acesso à sua galeria. Habilite a permissão em Ajustes.',
        type: 'warning',
      })
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
      const { attachments } = await uploadAttachmentService({
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
          className="m-auto flex size-30 items-center justify-center overflow-hidden rounded-xl bg-shape"
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
                  placeholder="Nome completo"
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
          {!profile ? (
            <>
              <Text className="font-label text-action-md leading-snug text-white">
                {isSubmitting ? 'Carregando...' : 'Cadastrar'}
              </Text>
              {isSubmitting ? (
                <ActivityIndicator color="white" size={24} />
              ) : (
                <ArrowRight02Icon className="stroke-white" />
              )}
            </>
          ) : (
            <Text className="m-auto text-center font-label text-action-md leading-snug text-white">
              {isSubmitting ? 'Carregando...' : 'Atualizar cadastro'}
            </Text>
          )}
        </Button>
      </View>
    </View>
  )
}
