import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const getTopics = createAsyncThunk('topics', async () => {
  try {
    const response = await apiClient().get('/feeds/topics');
    return response.data;
  } catch (err: any) {
    console.log(err);
    if (err?.response) throw new Error(err.response.data.message);
    throw err;
  }
});

export {getTopics};
