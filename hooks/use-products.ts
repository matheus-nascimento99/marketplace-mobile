import { useContext } from 'react'

import { ProductsContext } from '@/contexts/products'

export const useProducts = () => {
  return useContext(ProductsContext)
}
