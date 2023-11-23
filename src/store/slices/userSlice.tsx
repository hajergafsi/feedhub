import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CurrentYearActivity, IAuthError, IProfile} from '../interfaces';
import {getProfile} from '../thunks';

interface IState {
  isLoading: boolean;
  user: IProfile | null;
  currentYearActivity: CurrentYearActivity;
  error: IAuthError | null;
}

const initialState: IState = {
  isLoading: false,
  user: null,
  error: null,
  currentYearActivity: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(build) {
    build.addCase(
      getProfile.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<{
          user: IProfile;
          currentYearActivity: CurrentYearActivity;
        }>,
      ) => {
        state.user = payload.user;
        state.currentYearActivity = payload.currentYearActivity;
      },
    );
  },
});

const userReducer = userSlice.reducer;
export const {} = userSlice.actions;
export {userReducer};
