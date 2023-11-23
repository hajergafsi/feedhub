import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const getSearchFeeds = createAsyncThunk(
  'search/feeds',
  async ({token, search}: {token?: string; search?: string}) => {
    try {
      const response = token
        ? await apiClient().get(`/feeds${search ? `?title=${search}` : ''}`, {
            headers: {Authorization: `Bearer ${token}`},
          })
        : await apiClient().get(`/feeds${search ? `?title=${search}` : ''}`);

      return response.data.results;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {getSearchFeeds};
