import axios from 'axios'

import { env } from '@/env'
import { AppError } from '@/errors/app-error'

export const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
})

api.interceptors.request.use(async (config) => {
  // Faz alguma coisa antes da requisição ser enviada
  const isDevelopment = env.EXPO_PUBLIC_NODE_ENV === 'development'

  if (isDevelopment) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return config
})

api.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response && error.response.data) {
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
