import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {Alert} from 'react-native';

const reportPost = createAsyncThunk(
  'feeds/createReport',
  async ({
    id,
    token,
    reason,
    details,
  }: {
    id: string;
    token: string;
    reason: string;
    details?: string;
  }) => {
    const body =
      details && details.length > 0
        ? {feed: id, reason: reason, details: details}
        : {feed: id, reason: reason};
    try {
      const response = await apiClient().post('/feeds/reports', body, {
        headers: {Authorization: `Bearer ${token}`},
      });
      Alert.alert('Success', 'Reported with success');
      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {reportPost};
