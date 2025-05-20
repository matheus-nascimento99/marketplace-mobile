import axios, { AxiosInstance } from 'axios'

import { env } from '@/env'
import { AppError } from '@/errors/app-error'

type SignOut = () => Promise<void>

type APIInstanceProps = AxiosInstance & {
  registerInterceptManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
}) as APIInstanceProps

api.interceptors.request.use(async (config) => {
  // Faz alguma coisa antes da requisição ser enviada
  const isDevelopment = env.EXPO_PUBLIC_NODE_ENV === 'development'

  if (isDevelopment) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return config
})

api.registerInterceptManager = (signOut) => {
  const interceptManager = api.interceptors.response.use(
    (config) => config,
    async (error) => {
      if (error.response && error.response.data) {
        const mustLogout =
          'must_logout' in error.response.data &&
          !error.response.data.must_logout

        if (error.response.status === 401 && !mustLogout) {
          await signOut()
        }

        return Promise.reject(
          new AppError(
            error.response.data.error,
            error.response.data.message,
            error.response.data.statusCode,
          ),
        )
      }

      return Promise.reject(error)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptManager)
  }
}

export { api }
