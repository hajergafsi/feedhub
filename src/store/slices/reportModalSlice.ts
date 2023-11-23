import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {reportPost} from '../thunks';

const initialState: {
  isOpen: boolean;
  postId: string;
  postTitle: string;
} = {
  isOpen: false,
  postId: '',
  postTitle: '',
};

const reportPostModalSlice = createSlice({
  name: 'reportPostModal',
  initialState,
  reducers: {
    openReportModal: state => {
      state.isOpen = true;
    },
    closeReportModal: state => {
      state.isOpen = false;
      state.postId = '';
      state.postTitle = '';
    },
    setPostDetails: (
      state,
      {payload}: PayloadAction<{title: string; id: string}>,
    ) => {
      state.postId = payload.id;
      state.postTitle = payload.title;
    },
  },
  extraReducers(build) {
    build.addCase(reportPost.fulfilled, state => {
      state.isOpen = false;
      state.postId = '';
      state.postTitle = '';
    });
  },
});

const reportPostModalReducer = reportPostModalSlice.reducer;
export const {openReportModal, closeReportModal, setPostDetails} =
  reportPostModalSlice.actions;
export {reportPostModalReducer};
