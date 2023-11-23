import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const getFeedById = createAsyncThunk(
  'feedModal',
  async ({id, token}: {id: string; token?: string}) => {
    try {
      const response = token
        ? await apiClient().get(`/feeds/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
          })
        : await apiClient().get(`/feeds/${id}`);
      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {getFeedById};
