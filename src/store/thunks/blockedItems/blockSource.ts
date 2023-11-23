import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {Alert} from 'react-native';

const blockSource = createAsyncThunk(
  'blockedItems/blockedSource',
  async ({token, source}: {token: string; source: string}) => {
    try {
      const response = await apiClient().post(
        '/feeds/blocked-items/sources',
        {
          source: source,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      Alert.alert('Success', `${source} succesfully blocked`);
      console.log(response.data);

      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {blockSource};
