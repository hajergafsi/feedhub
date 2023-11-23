import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {Alert} from 'react-native';

const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (credentials: {phone: string; code: string; newPassword: string}) => {
    try {
      const response = await apiClient().post(
        '/auth/reset-password',
        credentials,
      );
      return response.data;
    } catch (err: any) {
      Alert.alert('error', err.response.data.message);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {resetPassword};
