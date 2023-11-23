import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAuthError} from '../interfaces';
import {getTopics} from '../thunks';

interface IState {
  isLoading: boolean;
  data: string[];
  error: IAuthError | null;
}

const initialState: IState = {
  isLoading: false,
  data: [],
  error: null,
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setTopics(state, {payload}: PayloadAction<string[]>) {
      state.data = payload;
    },
  },
  extraReducers(build) {
    build.addCase(getTopics.pending, state => {
      state.isLoading = true;
    });
    build.addCase(
      getTopics.fulfilled,
      (state, {payload}: PayloadAction<string[]>) => {
        state.isLoading = false;
        state.data = payload;
      },
    );
    build.addCase(getTopics.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {message: error.message || 'Failed to fetch topics !'};
    });
  },
});

const topicsReducer = topicsSlice.reducer;
const topicsActionCreators = topicsSlice.actions;

export {topicsReducer, topicsActionCreators};
