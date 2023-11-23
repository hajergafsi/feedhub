import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {EBlocked} from '../../interfaces';

const getBlockedItems = createAsyncThunk(
  'feeds/blockedItems',
  async ({token, type}: {token: string; type: EBlocked}) => {
    try {
      const response = await apiClient().get(`/feeds/blocked-items/${type}s`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      return {results: response.data.results, type: type};
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {getBlockedItems};
