import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAuthError} from '../interfaces';
import {addMedia} from '../thunks';
import {IMedia} from '../interfaces/storage.interface';

interface IState {
  isLoading: boolean;
  data: IMedia;
  error: IAuthError | null;
}

const initialState: IState = {
  isLoading: false,
  data: {type: '', url: ''},
  error: null,
};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setMedia(state, {payload}: PayloadAction<IMedia>) {
      state.data = payload;
    },
    clearMedia(state) {
      state.data = initialState.data;
    },
  },
  extraReducers(build) {
    build.addCase(addMedia.pending, state => {
      state.isLoading = true;
    });
    build.addCase(
      addMedia.fulfilled,
      (state, {payload}: PayloadAction<IMedia>) => {
        state.isLoading = false;
        state.data = payload;
      },
    );
    build.addCase(addMedia.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {message: error.message || 'Failed to add media !'};
    });
  },
});

const storageReducer = storageSlice.reducer;
export const {setMedia, clearMedia} = storageSlice.actions;
export {storageReducer};
