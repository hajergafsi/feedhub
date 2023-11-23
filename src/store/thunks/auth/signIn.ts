import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {Alert} from 'react-native';

export interface ICredentials {
  phone: string;
  password: string;
}

const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: ICredentials) => {
    try {
      const response = await apiClient().post('/auth/sign-in', credentials);
      Alert.alert('Success', 'signed in successfully !', [{text: 'Ok '}]);
      return response.data;
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err.response.data.message);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {signIn};
