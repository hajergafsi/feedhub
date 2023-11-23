import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const deleteUser = createAsyncThunk(
  'users/delete',
  async ({id, token}: {id: string; token: string}) => {
    try {
      const response = await apiClient().delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {deleteUser};
