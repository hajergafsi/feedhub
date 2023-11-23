import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const manageTagsModalSlice = createSlice({
  name: 'manageTagsModal',
  initialState,
  reducers: {
    openTagsModal: state => {
      state.isOpen = true;
    },
    closeTagsModal: state => {
      state.isOpen = false;
    },
  },
});

const manageTagsModalReducer = manageTagsModalSlice.reducer;
export const {openTagsModal, closeTagsModal} = manageTagsModalSlice.actions;
export {manageTagsModalReducer};
