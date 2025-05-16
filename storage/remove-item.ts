import AsyncStorage from '@react-native-async-storage/async-storage'

export const removeStorageItem = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key)
}
