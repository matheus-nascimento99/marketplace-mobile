import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useState } from 'react'

import { Product } from '@/dtos/product'
import { fetchProductsService } from '@/services/fetch-products'

type ProductsContextProps = {
  products?: Product[]
  search: string
  setSearch: (value: string) => void
  setInitialPrice: (value: string) => void
  setFinalPrice: (value: string) => void
  setCategoryId: (value: string) => void
}

export const ProductsContext = createContext<ProductsContextProps>(
  {} as ProductsContextProps,
)

export const ProductsContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  // states
  const [search, setSearch] = useState('')
  const [initialPrice, setInitialPrice] = useState('')
  const [finalPrice, setFinalPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const { data: products } = useQuery({
    queryKey: ['fetch-products', search, categoryId, finalPrice, initialPrice],
    queryFn: () =>
      fetchProductsService({
        search,
        categoryId,
        finalPrice,
        initialPrice,
      }),
  })

  return (
    <ProductsContext.Provider
      value={{
        products: products?.products,
        search,
        setSearch,
        setCategoryId,
        setFinalPrice,
        setInitialPrice,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
