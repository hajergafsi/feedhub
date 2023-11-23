import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const getBookmarks = createAsyncThunk(
  'feeds/bookmarks',
  async ({token, search}: {token: string; search?: string}) => {
    try {
      const response = await apiClient().get(
        `/feeds/bookmarks${search ? `?title=${search}` : ''}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      return response.data.results;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {getBookmarks};
