import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Image, Text, View } from 'react-native'

import { ArrowRight02Icon } from '@/assets/icons/arrow-right-02'
import { Button } from '@/components/ui/button'
import { Skeleton, SkeletonText } from '@/components/ui/skeleton'
import { env } from '@/env'
import { getProfileService } from '@/services/get-profile'

export const ProfileHeader = () => {
  // Get profile query
  const { data: profile } = useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfileService,
  })

  // Expo router hook for use in navigation
  const router = useRouter()

  return (
    <>
      {!profile ? (
        <View className="flex flex-row items-center gap-5">
          <Skeleton variant="rounded" className="h-14 w-14" speed={4} />

          <SkeletonText _lines={2} gap={2} className="h-2 w-2/5" />
        </View>
      ) : (
        <View className="flex flex-row items-center justify-center gap-5">
          {profile.seller.avatar ? (
            <Image
              src={profile.seller.avatar.url.replace(
                'localhost',
                env.EXPO_PUBLIC_API_IP,
              )}
              className="size-14 rounded-xl"
              alt=""
            />
          ) : (
            <Text>
              {profile.seller.name.split(' ')[0].charAt(0)}
              {profile.seller.name.split(' ').length > 1
                ? profile.seller.name.split(' ')[1].charAt(0)
                : ''}
            </Text>
          )}

          <View className="flex-1 space-y-1">
            <Text
              className="font-heading text-heading-sm leading-tight tracking-tight text-gray-500"
              numberOfLines={1}
            >
              Olá, {profile.seller.name}!
            </Text>
            <Button
              variant="link"
              size="link"
              onPress={() => router.navigate('/(public)/(private)/profile')}
            >
              <Text className="font-label text-action-sm leading-tight text-orange-base">
                Ver perfil
              </Text>
              <ArrowRight02Icon className="size-5 stroke-orange-base" />
            </Button>
          </View>
        </View>
      )}
    </>
  )
}
