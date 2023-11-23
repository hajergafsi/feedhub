import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = () => {
  const set = useCallback(async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }, []);
  const get = useCallback(async (key: string) => {
    const item = await AsyncStorage.getItem(key);
    return JSON.parse(item || 'null');
  }, []);

  const remove = useCallback(async (key: string) => {
    await AsyncStorage.removeItem(key);
  }, []);
  return {set, get, remove};
};
