import AsyncStorage from '@react-native-async-storage/async-storage'

export const getStorageItem = async (key: string): Promise<string | null> => {
  const value = await AsyncStorage.getItem(key)

  return value
}
