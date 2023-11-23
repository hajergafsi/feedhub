import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {TUdapeUserBody} from '../../interfaces';
import {Alert} from 'react-native';

const updateUser = createAsyncThunk(
  'users/update',
  async ({
    id,
    credentials,
    token,
  }: {
    id: string;
    credentials: TUdapeUserBody;
    token: string;
  }) => {
    try {
      const response = await apiClient().patch(`/users/${id}`, credentials, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Success', 'User information updated successfully !');
      return response.data;
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', 'Failed to update user information !');
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {updateUser};
