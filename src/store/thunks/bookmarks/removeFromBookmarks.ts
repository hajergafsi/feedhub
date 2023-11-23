import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const removeFromBookmarks = createAsyncThunk(
  'bookmarks/remove',
  async ({id, token}: {id: string; token: string}) => {
    try {
      await apiClient().delete(`/feeds/${id}/bookmarks`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return id;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {removeFromBookmarks};
