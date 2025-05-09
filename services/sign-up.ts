import { api } from '@/lib/api'

export type SignUpRequest = {
  name: string
  email: string
  phone: string
  password: string
  passwordConfirmation: string
  avatarId?: string | null
}

export const signUpService = async ({
  email,
  password,
  name,
  passwordConfirmation,
  phone,
  avatarId,
}: SignUpRequest) => {
  await api.post('/sellers', {
    email,
    password,
    name,
    passwordConfirmation,
    phone,
    avatarId,
  })
}
