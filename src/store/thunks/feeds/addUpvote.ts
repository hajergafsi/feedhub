import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const addUpvote = createAsyncThunk(
  'feeds/upvotes',
  async ({id, token}: {id: string; token: string}) => {
    try {
      const response = await apiClient().post(
        `/feeds/${id}/upvote`,
        {},
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

export {addUpvote};
