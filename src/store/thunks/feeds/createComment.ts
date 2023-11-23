import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const createComment = createAsyncThunk(
  'feeds/comments',
  async ({
    id,
    token,
    comment,
  }: {
    id: string;
    token: string;
    comment: string;
  }) => {
    try {
      const response = await apiClient().post(
        `/feeds/${id}/comments`,
        {content: comment},
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

export {createComment};
