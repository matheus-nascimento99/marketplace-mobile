import { useQuery } from '@tanstack/react-query'
import { ScrollView, View } from 'react-native'

import Logout01Icon from '@/assets/icons/loading-01'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/use-auth'
import { getProfileService } from '@/services/get-profile'

import { SignUpForm } from '../sign-up-form'

export default function Profile() {
  // auth context
  const { signOut } = useAuth()

  // Get profile query
  const { data: profile } = useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfileService,
  })

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="relative flex-1 px-10 pb-10">
        <Button
          variant="outline"
          size="2xs"
          className="absolute right-10 top-8"
          onPress={signOut}
        >
          <Logout01Icon className="stroke-orange-base" />
        </Button>

        {profile ? (
          <SignUpForm profile={profile.seller} />
        ) : (
          <View className="mt-8.5 gap-10">
            <View className="gap-5">
              <Skeleton className="w-30 h-30 m-auto rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
            </View>

            <View className="gap-10">
              <View className="gap-5">
                <Skeleton className="h-4 w-20 rounded-xl" />
                <Skeleton className="h-14 rounded-xl" />
                <Skeleton className="h-14 rounded-xl" />
                <Skeleton className="h-14 rounded-xl" />
              </View>

              <Skeleton className="h-14 rounded-xl" />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
}
