import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {Alert} from 'react-native';

const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (credentials: {phone: string}) => {
    console.log(credentials);
    try {
      const response = await apiClient().post(
        '/auth/forgot-password',
        credentials,
      );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err?.response) {
        Alert.alert(err.response.data.message);
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  },
);

export {forgotPassword};
