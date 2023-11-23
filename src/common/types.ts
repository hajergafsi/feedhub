import {AnyAction, Dispatch, ThunkDispatch} from '@reduxjs/toolkit';

export type TMenuItem = {
  name: string;
  icon: any;
  onPress?: any;
};

export type TDispatch = ThunkDispatch<any, undefined, AnyAction> &
  Dispatch<AnyAction>;

export enum EFilter {
  MOST_UPVOTED = 'mostUpvoted',
  POPULAR = 'popular',
}

export enum EFeedCategory {
  BOOKMARKS = 'bookmark',
  FEED = 'feed',
  SEARCH = 'search',
}
