import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IComment, IFeed, IFeedDetails, IUpvote} from '../interfaces';
import {getFeedById} from '../thunks/feeds/getFeedById';
import {addUpvote, createComment, removeUpvote} from '../thunks';
import {EFeedCategory} from '../../common';

const initialState: {
  isOpen: boolean;
  index: number;
  currentId: string;
  feedCategory: EFeedCategory;
  selectedFeed: IFeed | null;
} = {
  isOpen: false,
  index: 0,
  currentId: '',
  feedCategory: EFeedCategory.FEED,
  selectedFeed: null,
};

const feedModalSlice = createSlice({
  name: 'feedModal',
  initialState,
  reducers: {
    openFeedModal: state => {
      state.isOpen = true;
    },
    closeFeedModal: state => {
      state.isOpen = false;
    },
    setSelectedFeed: (state, {payload}: PayloadAction<IFeedDetails>) => {
      state.currentId = payload.id;
      state.feedCategory = payload.category;
      state.index = payload.index;
    },
  },
  extraReducers(build) {
    build.addCase(
      getFeedById.fulfilled,
      (state, {payload}: PayloadAction<IFeed>) => {
        state.selectedFeed = payload;
      },
    );
    build.addCase(
      createComment.fulfilled,
      (state, {payload}: PayloadAction<IComment>) => {
        if (state.selectedFeed)
          state.selectedFeed.comments = [
            ...(state.selectedFeed?.comments || []),
            payload,
          ];
      },
    );
    build.addCase(
      addUpvote.fulfilled,
      (state, {payload}: PayloadAction<IUpvote>) => {
        if (state.selectedFeed) {
          state.selectedFeed.isUpVotedByUser = true;
          state.selectedFeed.upVotes = [
            ...state.selectedFeed.upVotes,
            payload.id,
          ];
        }
      },
    );
    build.addCase(removeUpvote.fulfilled, state => {
      if (state.selectedFeed) state.selectedFeed.isUpVotedByUser = false;
    });
  },
});

const feedModalReducer = feedModalSlice.reducer;
export const {openFeedModal, closeFeedModal, setSelectedFeed} =
  feedModalSlice.actions;
export {feedModalReducer};
