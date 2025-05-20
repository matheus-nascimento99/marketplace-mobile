import { useRouter } from 'expo-router'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { api } from '@/lib/api'
import { SignInRequest, signInService } from '@/services/sign-in'
import { SignUpRequest, signUpService } from '@/services/sign-up'
import { getStorageItem } from '@/storage/get-item'
import { removeStorageItem } from '@/storage/remove-item'
import { setStorageItem } from '@/storage/set-item'

type AuthContextType = {
  signIn: (props: SignInRequest) => Promise<void>
  signOut: () => Promise<void>
  signUp: (props: SignUpRequest) => Promise<void>
  isLoadingUserData: boolean
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // state for control loading while get token
  const [loading, setLoading] = useState(true)

  // Expo router hook for use in navigation
  const router = useRouter()

  // use effect for load user token
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await getStorageItem('access_token')

        if (!token) return

        setTokenInDefaultHeaders(token)
        router.replace('/(public)/(private)/products')
      } catch (error) {
        console.error('Erro ao carregar o token')
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

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

  const signOut = useCallback(async () => {
    try {
      await removeFromStorage('access_token')

      router.replace('/(public)')
    } catch (error) {
      console.error('Erro ao remover token do async storage', error)
      throw error
    }
  }, [router])

  // use effect for subscribe register interceptor
  useEffect(() => {
    const subscriber = api.registerInterceptManager(signOut)

    return () => {
      subscriber()
    }
  }, [signOut])

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
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, signUp, isLoadingUserData: loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
