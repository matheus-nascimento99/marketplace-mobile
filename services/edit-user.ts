import { api } from '@/lib/api'

type EditUserServiceRequest = {
  name: string
  email: string
  phone: string
  password?: string | null
  avatarId?: string | null
}

export const editUserService = async ({
  name,
  email,
  phone,
  password,
  avatarId,
}: EditUserServiceRequest) => {
  await api.put('/sellers', {
    email,
    password,
    name,
    phone,
    avatarId,
  })
}
