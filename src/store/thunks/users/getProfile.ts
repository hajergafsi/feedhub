import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const getProfile = createAsyncThunk('users/profile', async (token: string) => {
  try {
    const response = await apiClient().get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log(response.data);

    return response.data;
  } catch (err: any) {
    console.log(err);
    if (err?.response) throw new Error(err.response.data.message);
    throw err;
  }
});

export {getProfile};
