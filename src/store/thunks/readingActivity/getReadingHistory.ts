import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const getReadingHistory = createAsyncThunk(
  'feeds/readingActivity',
  async ({token, search}: {token: string; search?: string}) => {
    try {
      const response = await apiClient().get(
        `/feeds/reading-history${search ? `?title=${search}` : ''}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {getReadingHistory};
