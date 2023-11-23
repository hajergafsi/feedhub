import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAuthError, IComment, IFeed, IUpvote} from '../interfaces';
import {addUpvote, createComment, getFeeds, removeUpvote} from '../thunks';
import {Alert} from 'react-native';
import {EFilter} from '../../common';

interface IState {
  isLoading: boolean;
  data: IFeed[];
  filter: EFilter | null;
  error: IAuthError | null;
}

const initialState: IState = {
  isLoading: false,
  data: [],
  filter: null,
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeeds(state, {payload}: PayloadAction<IFeed[]>) {
      state.data = payload;
    },
    setFilter(state, {payload}: PayloadAction<EFilter | null>) {
      state.filter = payload;
    },
    hideFeed(state, {payload}: PayloadAction<string>) {
      state.data = state.data.filter(item => item.id !== payload);
      Alert.alert("This post won't show up in your feed anymore");
    },
  },
  extraReducers(build) {
    build.addCase(getFeeds.pending, state => {
      state.isLoading = true;
    });
    build.addCase(
      getFeeds.fulfilled,
      (state, {payload}: PayloadAction<IFeed[]>) => {
        state.isLoading = false;
        state.data = payload;
      },
    );
    build.addCase(getFeeds.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {message: error.message || 'Failed to fetch feeds !'};
    });
    build.addCase(
      createComment.fulfilled,
      (state, {payload}: PayloadAction<IComment>) => {
        const feed = state.data.find(item => item.id === payload.feed);
        if (feed) {
          const index = state.data.indexOf(feed);
          state.data = state.data.filter(item => item.id !== feed.id);
          state.data.splice(index, 0, {
            ...feed,
            comments: [...feed.comments, payload],
          });
        }
      },
    );
    build.addCase(
      addUpvote.fulfilled,
      (state, {payload}: PayloadAction<IUpvote>) => {
        const feed = state.data.find(state => state.id === payload.feed);
        if (feed) {
          const index = state.data.indexOf(feed);
          state.data = state.data.filter(item => item.id !== feed.id);
          state.data.splice(index, 0, {
            ...feed,
            upVotes: [...feed.upVotes, payload.id],
            isUpVotedByUser: true,
          });
        }
      },
    );
    build.addCase(
      removeUpvote.fulfilled,
      (state, {payload}: PayloadAction<string>) => {
        const feed = state.data.find(state => state.id === payload);
        if (feed) {
          const index = state.data.indexOf(feed);
          state.data = state.data.filter(item => item.id !== feed.id);
          state.data.splice(index, 0, {
            ...feed,
            isUpVotedByUser: false,
          });
        }
      },
    );
  },
});

const feedReducer = feedSlice.reducer;
export const {hideFeed, setFeeds, setFilter} = feedSlice.actions;
export {feedReducer};
