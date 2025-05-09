import AsyncStorage from '@react-native-async-storage/async-storage'

export const setStorageItem = async (
  key: string,
  value: string,
): Promise<void> => {
  await AsyncStorage.setItem(key, value)
}
