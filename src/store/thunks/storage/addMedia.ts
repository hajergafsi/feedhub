import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const addMedia = createAsyncThunk(
  'storage',
  async (data: {body: FormData; token: string}) => {
    try {
      const response = await apiClient().post('/storage/images', data.body, {
        headers: {
          Authorization: `Bearer ${data.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data[0];
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {addMedia};
