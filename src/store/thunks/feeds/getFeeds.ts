import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {EUpvotePeriod} from '../../interfaces';

const getFeeds = createAsyncThunk(
  'feeds',
  async ({
    token,
    search,
    mostUpvoted,
    popular,
    upVoteSorting,
  }: {
    token?: string;
    search?: string;
    mostUpvoted?: boolean;
    popular?: boolean;
    upVoteSorting?: EUpvotePeriod;
  }) => {
    const withFilter =
      '/feeds' +
      (search
        ? `?title=${search}`
        : mostUpvoted
        ? `/most-up-voted${upVoteSorting ? `?period=${upVoteSorting}` : ''}`
        : popular
        ? '/popular'
        : '');
    try {
      const response = token
        ? await apiClient().get(withFilter, {
            headers: {Authorization: `Bearer ${token}`},
          })
        : await apiClient().get(withFilter);

      return mostUpvoted || popular ? response.data : response.data.results;
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {getFeeds};
