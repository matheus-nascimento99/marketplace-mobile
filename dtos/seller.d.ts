export type Seller = {
  id: string
  name: string
  phone: string
  email: string
  avatar: {
    id: string
    url: string
  } | null
}
