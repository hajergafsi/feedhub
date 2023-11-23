import {IUser} from './auth.interface';

export interface IFeed {
  title: string;
  caption: string;
  sourceName: string;
  sourceLogo: string;
  sourceURL: string;
  upVotes: any[];
  comments: IComment[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
  thumbnail: string;
  isUpVotedByUser?: boolean;
}

export interface IComment {
  content: string;
  user: IUser;
  feed: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IUpvote {
  user: string;
  feed: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export enum EUpvotePeriod {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}
