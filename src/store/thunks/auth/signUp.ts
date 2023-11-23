import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {Alert} from 'react-native';

export interface ISignUpCredentials {
  phone: string;
  password: string;
  username: string;
}

const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: ISignUpCredentials) => {
    try {
      const response = await apiClient().post('/auth/sign-up', credentials);
      Alert.alert('Succes', 'Signed up successfully');
      return response.data;
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err.response.data.message);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {signUp};
