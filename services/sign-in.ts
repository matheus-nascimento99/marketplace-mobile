import { api } from '@/lib/api'

export type SignInRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  accessToken: string
}

export const signInService = async ({ email, password }: SignInRequest) => {
  const { data } = await api.post<SignInResponse>('/sellers/sessions', {
    email,
    password,
  })

  return data
}
