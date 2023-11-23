import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {Alert} from 'react-native';

const unblockItem = createAsyncThunk(
  'blockedItems/unblock',
  async ({token, id}: {token: string; id: string}) => {
    try {
      await apiClient().delete(`/feeds/blocked-items/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      Alert.alert('Success', 'Succesfully unblocked');
      return id;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {unblockItem};
