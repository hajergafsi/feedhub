import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {Alert} from 'react-native';

const blockTag = createAsyncThunk(
  'blockedItems/blockedTag',
  async ({token, tag}: {token: string; tag: string}) => {
    try {
      const response = await apiClient().post(
        '/feeds/blocked-items/tags',
        {
          tag: tag,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      Alert.alert('Success', `#${tag} succesfully blocked`);
      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {blockTag};
