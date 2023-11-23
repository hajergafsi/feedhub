import {createSlice} from '@reduxjs/toolkit';
import {forgotPassword, signIn, signUp} from '../thunks';
import {resetPassword} from '../thunks/auth/resetPassword';

const initialState = {
  isOpen: false,
};

const signInModalSlice = createSlice({
  name: 'signInModal',
  initialState,
  reducers: {
    openModal: state => {
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
  },
  extraReducers(build) {
    build.addCase(signUp.fulfilled, state => {
      state.isOpen = false;
    });
    build.addCase(signIn.fulfilled, state => {
      state.isOpen = false;
    });
    build.addCase(resetPassword.fulfilled, state => {
      state.isOpen = false;
    });
    /* build.addCase(resetPassword.rejected, state => {
      state.isOpen = true;
    }); */
  },
});

const signInModalReducer = signInModalSlice.reducer;
export const {openModal, closeModal} = signInModalSlice.actions;
export {signInModalReducer};
