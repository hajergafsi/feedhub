import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const signOut = createAsyncThunk('auth/signOut', async (token: string) => {
  try {
    const response = await apiClient().get('/auth/sign-out', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (err: any) {
    console.log(err);
    if (err?.response) throw new Error(err.response.data.message);
    throw err;
  }
});

export {signOut};
