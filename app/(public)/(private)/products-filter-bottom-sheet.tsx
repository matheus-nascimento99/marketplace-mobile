import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { z } from 'zod'

import AlertCircleIcon from '@/assets/icons/alert-circle'
import Cancel01Icon from '@/assets/icons/cancel-01'
import { FilterVerticalIcon } from '@/assets/icons/filter-vertical'
import { Button } from '@/components/ui/button'
import { CircleIcon } from '@/components/ui/icon'
import * as Input from '@/components/ui/input'
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@/components/ui/radio'
import { useProducts } from '@/hooks/use-products'
import { fetchCategoriesService } from '@/services/fetch-categories'
import { maskCurrency } from '@/utils/mask-currency'

const productsFilterBottomSheetSchema = z
  .object({
    initial_price: z.string(),
    final_price: z.string(),
    category_id: z.union([z.string().uuid(), z.literal('')]),
  })
  .refine(
    (data) =>
      (!data.initial_price && !data.final_price) ||
      (data.initial_price && data.final_price) ||
      data.final_price,
    {
      message: 'Por favor, informe o preço final',
      path: ['final_price'],
    },
  )

type ProductsFilterBottomSheetSchema = z.infer<
  typeof productsFilterBottomSheetSchema
>

export const ProductsFilterBottomSheet = () => {
  // fetch categories query
  const { data: categories } = useQuery({
    queryKey: ['fetch-categories'],
    queryFn: fetchCategoriesService,
  })

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)
  const initialPriceRef = useRef<TextInput>(null)
  const finalPriceRef = useRef<TextInput>(null)

  // variables
  const snapPoints = useMemo(() => ['78%'], [])

  // callbacks
  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0)
  }, [])
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close()
    blurInputs()
  }, [])

  // Backdrop
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  )

  // Use form react hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductsFilterBottomSheetSchema>({
    resolver: zodResolver(productsFilterBottomSheetSchema),
    defaultValues: {
      initial_price: '',
      final_price: '',
      category_id: '',
    },
  })

  // products context
  const { setCategoryId, setFinalPrice, setInitialPrice } = useProducts()

  const onSubmit = ({
    initial_price,
    final_price,
    category_id,
  }: ProductsFilterBottomSheetSchema) => {
    setInitialPrice(initial_price)
    setFinalPrice(final_price)
    setCategoryId(category_id)

    handleClosePress()
  }

  const handleResetForm = () => {
    reset({ category_id: '', final_price: '', initial_price: '' })

    setCategoryId('')
    setFinalPrice('')
    setInitialPrice('')
  }

  const blurInputs = () => {
    initialPriceRef.current?.blur()
    finalPriceRef.current?.blur()
  }

  return (
    <View>
      <Button variant="outline" size="2xs" onPress={handlePresentPress}>
        <FilterVerticalIcon className="stroke-orange-base" />
      </Button>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          enablePanDownToClose
          index={-1}
        >
          <BottomSheetView className="flex-1 px-6 py-8">
            <View className="flex gap-6">
              <View className="flex flex-row items-start justify-between">
                <Text className="font-heading text-heading-md leading-tight text-gray-500">
                  Filtrar anúncios
                </Text>

                <Pressable onPress={handleClosePress}>
                  <Cancel01Icon className="size-5 stroke-gray-300" />
                </Pressable>
              </View>
              <View className="flex gap-2">
                <Text className="font-heading text-heading-xs leading-tight text-gray-500">
                  Valor
                </Text>

                <View className="flex flex-row gap-6">
                  <Input.Root>
                    <Input.Content>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input.ControlInput
                            ref={initialPriceRef}
                            placeholder="De"
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                              const currency = text.replace(/\D/g, '')

                              if (Number(currency) > 0) {
                                onChange(currency)
                              } else {
                                onChange('')
                              }
                            }}
                            value={value ? maskCurrency(value) : ''}
                            returnKeyType="next"
                          />
                        )}
                        name="initial_price"
                      />
                    </Input.Content>
                    {errors.initial_price && (
                      <Input.Error>
                        <AlertCircleIcon className="size-4 stroke-danger" />
                        <Text className="text-danger">
                          {errors.initial_price.message}
                        </Text>
                      </Input.Error>
                    )}
                  </Input.Root>

                  <Input.Root>
                    <Input.Content>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input.ControlInput
                            ref={finalPriceRef}
                            placeholder="Até"
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                              const currency = text.replace(/\D/g, '')

                              if (Number(currency) > 0) {
                                onChange(currency)
                              } else {
                                onChange('')
                              }
                            }}
                            value={value ? maskCurrency(value) : ''}
                            returnKeyType="next"
                          />
                        )}
                        name="final_price"
                      />
                    </Input.Content>
                    {errors.final_price && (
                      <Input.Error>
                        <AlertCircleIcon className="size-4 stroke-danger" />
                        <Text className="text-danger">
                          {errors.final_price.message}
                        </Text>
                      </Input.Error>
                    )}
                  </Input.Root>
                </View>
              </View>
              <View className="flex gap-2">
                <Text className="font-heading text-heading-xs leading-tight text-gray-500">
                  Categoria
                </Text>

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup value={value} onChange={onChange}>
                      {categories && (
                        <FlatList
                          data={categories.categories}
                          contentContainerClassName="flex gap-3"
                          keyExtractor={({ id }) => id}
                          renderItem={({ item }) => (
                            <Radio value={item.id} className="p-0.5">
                              <RadioIndicator>
                                <RadioIcon as={CircleIcon} />
                              </RadioIndicator>
                              <RadioLabel className="font-body text-body-md leading-snug text-gray-400">
                                {item.title}
                              </RadioLabel>
                            </Radio>
                          )}
                        />
                      )}
                    </RadioGroup>
                  )}
                  name="category_id"
                />
              </View>
            </View>
            <View className="mt-auto flex flex-row gap-3">
              <Button variant="outline" size="sm" onPress={handleResetForm}>
                <Text className="font-label text-action-sm leading-tight text-orange-base">
                  Limpar filtro
                </Text>
              </Button>
              <Button size="sm" onPress={handleSubmit(onSubmit)}>
                <Text className="font-label text-action-sm leading-tight text-white">
                  Filtrar
                </Text>
              </Button>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </View>
  )
}
