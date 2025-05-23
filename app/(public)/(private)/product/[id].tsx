import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Image, Linking, Platform, Text, View } from 'react-native'

import ArrowLeft02Icon from '@/assets/icons/arrow-left-02'
import { Button } from '@/components/ui/button'
import { Skeleton, SkeletonText } from '@/components/ui/skeleton'
import { Product } from '@/dtos/product'
import { env } from '@/env'
import { getProductService } from '@/services/get-product'
import { getViewsAmountInWeekService } from '@/services/get-views-amount-in-week'
import { registerProductViewService } from '@/services/register-product-view'

import { ProductWeekViews } from './product-week-views'

type ProductParams = {
  id: string
}

export default function ProductDetails() {
  // Expo router hook for use in navigation
  const router = useRouter()

  // product id param
  const { id: productId } = useLocalSearchParams<ProductParams>()

  // get product query
  const { data: productData } = useQuery({
    queryKey: ['get-product', productId],
    queryFn: () =>
      getProductService({
        productId,
      }),
  })

  // get views amount in week query
  const { data: viewAmountInWeekData, refetch } = useQuery({
    queryKey: ['get-views-amount-in-week', productId],
    queryFn: () =>
      getViewsAmountInWeekService({
        productId,
      }),
  })

  // register view when access product page
  useEffect(() => {
    registerProductViewService({ productId }).then(() => refetch())
  }, [productId])

  // function do handle contact button click
  const handleContactButton = async (product: Product) => {
    const url = `whatsapp://send?phone=55${product.owner.phone}`

    const canOpen = await Linking.canOpenURL(url)

    if (!canOpen) {
      const storeUrl =
        Platform.OS === 'ios'
          ? 'https://apps.apple.com/app/whatsapp-messenger/id310633997'
          : 'https://play.google.com/store/apps/details?id=com.whatsapp'

      await Linking.openURL(storeUrl)
    }

    Linking.openURL(url)
      .then(() => {
        console.log('WhatsApp Opened')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <View className="flex-1">
      <View className="mt-9 px-4">
        <Button
          variant="link"
          size="link"
          onPress={() => router.replace('/(public)/(private)/products')}
        >
          <ArrowLeft02Icon className="size-5 stroke-orange-base" />
          <Text className="font-label text-action-sm leading-tight text-orange-base">
            Voltar
          </Text>
        </Button>

        <View className="mt-4">
          {productData ? (
            <Image
              src={productData.product.attachments[0].url.replace(
                'localhost',
                env.EXPO_PUBLIC_API_IP,
              )}
              className="h-[197px] w-full rounded-md"
              alt="Product image"
            />
          ) : (
            <Skeleton className="h-[197px] w-full rounded-md" speed={4} />
          )}
        </View>

        <View className="mt-7 gap-4">
          {productData ? (
            <View className="flex flex-row items-end justify-between">
              <Text className="font-heading text-heading-md leading-tight text-gray-400">
                {productData.product.title}
              </Text>
              <Text className="font-heading text-heading-md leading-tight text-gray-500">
                {(productData.product.priceInCents / 100).toLocaleString(
                  'pt-BR',
                  { style: 'currency', currency: 'BRL' },
                )}
              </Text>
            </View>
          ) : (
            <View className="flex flex-row justify-between">
              <Skeleton className="h-6 w-2/6" />
              <Skeleton className="h-6 w-2/6" />
            </View>
          )}

          {productData ? (
            <Text className="font-body text-body-sm leading-snug text-gray-400">
              {productData.product.description}
            </Text>
          ) : (
            <SkeletonText _lines={2} className="h-2 w-full" />
          )}
        </View>

        {productData ? (
          <View className="mt-7 gap-1">
            <Text className="font-heading text-heading-xs leading-tight text-gray-500">
              Categoria
            </Text>
            <Text className="font-body text-body-xs leading-snug text-gray-400">
              {productData.product.category.title}
            </Text>
          </View>
        ) : (
          <SkeletonText _lines={2} gap={2} className="h-2 w-full" />
        )}

        <View className="mt-7">
          {viewAmountInWeekData && viewAmountInWeekData.amount > 0 ? (
            <ProductWeekViews views={viewAmountInWeekData?.amount} />
          ) : (
            <Skeleton className="h-[60px] w-full rounded-card" />
          )}
        </View>
      </View>
      <View className="mt-auto h-24 bg-white px-6 pb-8 pt-6">
        {productData ? (
          <View className="flex flex-row items-center justify-between">
            <Text
              className="flex-1 font-heading text-heading-lg leading-tight text-gray-500"
              numberOfLines={1}
            >
              {(productData.product.priceInCents / 100).toLocaleString(
                'pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL',
                },
              )}
            </Text>
            <Button
              size="sm"
              onPress={() => handleContactButton(productData.product)}
            >
              <Text className="font-label leading-tight text-white">
                Entrar em contato
              </Text>
            </Button>
          </View>
        ) : (
          <Skeleton className="h-10 w-full" />
        )}
      </View>
    </View>
  )
}
