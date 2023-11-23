import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAuthError} from '../interfaces';
import {
  EBlocked,
  IBlock,
  TBlockResponse,
} from '../interfaces/blockeItems.interface';
import {
  blockSource,
  blockTag,
  getBlockedItems,
  unblockItem,
} from '../thunks/blockedItems';

interface IState {
  isLoading: boolean;
  blockedTags: IBlock[];
  blockedSources: IBlock[];
  error: IAuthError | null;
}

const initialState: IState = {
  isLoading: false,
  blockedTags: [],
  blockedSources: [],
  error: null,
};

const blockedItemsSlice = createSlice({
  name: 'blockedItems',
  initialState,
  reducers: {
    setBlockedSources(state, {payload}: PayloadAction<IBlock[]>) {
      state.blockedSources = payload;
    },
    setBlockedTags(state, {payload}: PayloadAction<IBlock[]>) {
      state.blockedTags = payload;
    },
  },
  extraReducers(build) {
    build.addCase(getBlockedItems.pending, state => {
      state.isLoading = true;
    });
    build.addCase(
      getBlockedItems.fulfilled,
      (state, {payload}: PayloadAction<TBlockResponse>) => {
        state.isLoading = false;
        if (payload.type === EBlocked.SOURCE)
          state.blockedSources = payload.results;
        else state.blockedTags = payload.results;
      },
    );
    build.addCase(getBlockedItems.rejected, (state, {error}) => {
      state.isLoading = false;
      state.error = {
        message: error.message || 'Failed to fetch blocked items !',
      };
    });
    build.addCase(
      blockTag.fulfilled,
      (state, {payload}: PayloadAction<IBlock>) => {
        state.blockedTags = [...state.blockedTags, payload];
      },
    );
    build.addCase(
      blockSource.fulfilled,
      (state, {payload}: PayloadAction<IBlock>) => {
        state.blockedSources = [...state.blockedSources, payload];
      },
    );
    build.addCase(
      unblockItem.fulfilled,
      (state, {payload}: PayloadAction<string>) => {
        console.log(payload);

        const source = state.blockedSources.find(e => e.id === payload);
        const tag = state.blockedTags.find(e => e.id === payload);
        if (source)
          state.blockedSources = state.blockedSources.filter(
            a => a.id !== payload,
          );
        else if (tag)
          state.blockedTags = state.blockedTags.filter(a => a.id !== payload);
      },
    );
  },
});

const blockedItemsReducer = blockedItemsSlice.reducer;
export const {setBlockedSources, setBlockedTags} = blockedItemsSlice.actions;
export {blockedItemsReducer};
