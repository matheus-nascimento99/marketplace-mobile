import { useRouter } from 'expo-router'
import { createContext, ReactNode } from 'react'

import { api } from '@/lib/api'
import { SignInRequest, signInService } from '@/services/sign-in'
import { SignUpRequest, signUpService } from '@/services/sign-up'
import { removeStorageItem } from '@/storage/remove-item'
import { setStorageItem } from '@/storage/set-item'

type AuthContextType = {
  signIn: (props: SignInRequest) => Promise<void>
  signOut: () => Promise<void>
  signUp: (props: SignUpRequest) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Expo router hook for use in navigation
  const router = useRouter()

  const signIn = async ({ email, password }: SignInRequest) => {
    try {
      const { accessToken } = await signInService({ email, password })

      await updateStorage('access_token', accessToken)

      setTokenInDefaultHeaders(accessToken)
    } catch (error) {
      console.error('Erro ao realizar login', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await removeFromStorage('access_token')

      router.replace('/(public)')
    } catch (error) {
      console.error('Erro ao remover token do async storage', error)
      throw error
    }
  }

  const signUp = async ({
    email,
    name,
    password,
    passwordConfirmation,
    phone,
    avatarId,
  }: SignUpRequest) => {
    try {
      await signUpService({
        email,
        name,
        password,
        passwordConfirmation,
        phone,
        avatarId,
      })
    } catch (error) {
      console.error('Erro ao realizar cadastro do usuário', error)
      throw error
    }
  }

  const updateStorage = async (key: string, value: string) => {
    try {
      await setStorageItem(key, value)
    } catch (error) {
      console.error('Erro ao salvar token no async storage')
      throw error
    }
  }

  const removeFromStorage = async (key: string) => {
    try {
      await removeStorageItem(key)
    } catch (error) {
      console.error('Erro ao remover token no async storage')
      throw error
    }
  }

  const setTokenInDefaultHeaders = (token: string) => {
    api.defaults.headers.common.Authorization = token
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
