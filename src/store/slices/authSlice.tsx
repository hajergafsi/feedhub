import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  CurrentYearActivity,
  EAuthErrors,
  IAuth,
  IAuthError,
  IProfile,
  IUser,
  TUdapeUserBody,
} from '../interfaces';
import {
  forgotPassword,
  getProfile,
  signIn,
  signOut,
  signUp,
  updateUser,
} from '../thunks';

interface IState {
  isLoading: boolean;
  data: IAuth | null;
  error: IAuthError | null;
}

const initialState: IState = {
  isLoading: false,
  data: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, {payload}: PayloadAction<IAuth>) {
      state.data = payload;
    },
  },
  extraReducers(build) {
    build.addCase(signIn.pending, state => {
      state.isLoading = true;
    });
    build.addCase(
      updateUser.fulfilled,
      (state, {payload}: PayloadAction<TUdapeUserBody>) => {
        state.isLoading = false;
        if (state.data) {
          state.data.user = payload as IUser;
        }
        //console.log(state.data?.user);
      },
    );
    build.addCase(
      signIn.fulfilled,
      (state, {payload}: PayloadAction<IAuth>) => {
        state.isLoading = false;
        state.data = payload;
      },
    );
    build.addCase(signIn.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {message: error?.message || 'Failed to sign in'};
    });
    build.addCase(signUp.pending, state => {
      state.isLoading = true;
    });
    build.addCase(
      signUp.fulfilled,
      (state, {payload}: PayloadAction<IAuth>) => {
        state.isLoading = false;
        state.data = payload;
      },
    );
    build.addCase(signUp.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {message: error.message || 'Failed to sign up'};
    });
    build.addCase(signOut.pending, state => {
      state.isLoading = true;
    });
    build.addCase(signOut.fulfilled, state => {
      state.isLoading = false;
      state.data = null;
    });
    build.addCase(signOut.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {message: error.message || 'Failed to sign out'};
    });
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
        if (state.data) {
          state.data.user.readingStreak = payload.user.readingStreak;
        }
      },
    );
    build.addCase(forgotPassword.rejected, state => {
      state.error = {message: EAuthErrors.FORGOT_PASSWORD};
    });
    build.addCase(forgotPassword.fulfilled, state => {
      state.error = null;
    });
  },
});

const authReducer = authSlice.reducer;
const authActionCreators = authSlice.actions;

export {authReducer, authActionCreators};
