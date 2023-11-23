import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';

const createReadingActivity = createAsyncThunk(
  'users/readingActivity',
  async ({token, id}: {token: string; id: string}) => {
    try {
      const response = await apiClient().post(
        `/users/reading-activity`,
        {
          feedId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.status;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {createReadingActivity};
