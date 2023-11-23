import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAuthError, IFeed, IUpvote} from '../interfaces';
import {
  getBookmarks,
  addToBookmarks,
  removeFromBookmarks,
  signOut,
  addUpvote,
  removeUpvote,
} from '../thunks';
import {Alert} from 'react-native';

interface IState {
  isLoading: boolean;
  bookmarks: IFeed[];
  error: IAuthError | null;
}

const initialState: IState = {
  isLoading: false,
  bookmarks: [],
  error: null,
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarks(state, {payload}: PayloadAction<IFeed[]>) {
      state.bookmarks = payload;
    },
    deleteBookmark(state, {payload}: PayloadAction<string>) {
      state.bookmarks = state.bookmarks.filter(item => item.id !== payload);
      Alert.alert('Removed from bookmarks');
    },
    addBookmark(state, {payload}: PayloadAction<IFeed>) {
      state.bookmarks = [...state.bookmarks, payload];
      Alert.alert('Added to bookmarks');
    },
  },
  extraReducers(build) {
    build.addCase(getBookmarks.pending, state => {
      state.isLoading = true;
    });
    build.addCase(
      getBookmarks.fulfilled,
      (state, {payload}: PayloadAction<IFeed[]>) => {
        state.isLoading = false;
        state.bookmarks = payload;
      },
    );
    build.addCase(getBookmarks.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {message: error.message || 'Failed to fetch bookmarks !'};
    });
    build.addCase(addToBookmarks.pending, state => {
      state.isLoading = true;
    });
    build.addCase(
      addToBookmarks.fulfilled,
      (state, {payload}: PayloadAction<IFeed>) => {
        state.isLoading = false;
        state.bookmarks = [...state.bookmarks, payload];
      },
    );
    build.addCase(addToBookmarks.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {message: error.message || 'Failed to add to bookmarks !'};
    });
    build.addCase(removeFromBookmarks.pending, state => {
      state.isLoading = true;
    });
    build.addCase(
      removeFromBookmarks.fulfilled,
      (state, {payload}: PayloadAction<string>) => {
        state.isLoading = false;
        state.bookmarks = [...state.bookmarks].filter(
          item => item.id !== payload,
        );
      },
    );
    build.addCase(removeFromBookmarks.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {
        message: error.message || 'Failed to remove from bookmarks !',
      };
    });
    build.addCase(signOut.fulfilled, state => {
      state.bookmarks = [];
    });
    build.addCase(
      addUpvote.fulfilled,
      (state, {payload}: PayloadAction<IUpvote>) => {
        const feed = state.bookmarks.find(state => state.id === payload.feed);
        if (feed) {
          const index = state.bookmarks.indexOf(feed);
          state.bookmarks = state.bookmarks.filter(item => item.id !== feed.id);
          state.bookmarks.splice(index, 0, {
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
        const feed = state.bookmarks.find(state => state.id === payload);
        if (feed) {
          const index = state.bookmarks.indexOf(feed);
          state.bookmarks = state.bookmarks.filter(item => item.id !== feed.id);
          state.bookmarks.splice(index, 0, {
            ...feed,
            isUpVotedByUser: false,
          });
        }
      },
    );
  },
});

const bookmarksReducer = bookmarkSlice.reducer;
export const {setBookmarks, addBookmark, deleteBookmark} =
  bookmarkSlice.actions;
export {bookmarksReducer};
