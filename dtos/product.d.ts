import { Attachment } from './attachment'
import { Category } from './category'
import { Seller } from './seller'

export type Product = {
  id: string
  title: string
  description: string
  priceInCents: number
  status: 'available' | 'cancelled' | 'sold'
  owner: Seller
  category: Category
  attachments: Attachment[]
}
