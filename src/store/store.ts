import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {useSelector, useDispatch} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux/es/types';
import {
  signInModalReducer,
  authReducer,
  feedReducer,
  topicsReducer,
  userReducer,
  storageReducer,
  bookmarksReducer,
  manageTagsModalReducer,
  feedModalReducer,
  reportPostModalReducer,
  blockedItemsReducer,
  searchReducer,
  readingHistoryReducer,
} from './slices';

const store = configureStore({
  reducer: {
    signInModal: signInModalReducer,
    auth: authReducer,
    feeds: feedReducer,
    topics: topicsReducer,
    user: userReducer,
    storage: storageReducer,
    bookmarks: bookmarksReducer,
    manageTags: manageTagsModalReducer,
    feedModal: feedModalReducer,
    reportModal: reportPostModalReducer,
    blockedItems: blockedItemsReducer,
    search: searchReducer,
    readingHistory: readingHistoryReducer,
  },
});
setupListeners(store.dispatch);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {store, useAppSelector, useAppDispatch};
