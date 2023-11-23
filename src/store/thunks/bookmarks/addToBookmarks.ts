import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../../apis';
import {IFeed} from '../../interfaces';

const addToBookmarks = createAsyncThunk(
  'bookmarks',
  async ({bookmark, token}: {bookmark: IFeed; token: string}) => {
    try {
      await apiClient().post(
        `/feeds/${bookmark.id}/bookmarks`,
        {},
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      return {
        title: bookmark.title,
        caption: bookmark.caption,
        sourceName: bookmark.sourceName,
        sourceLogo: bookmark.sourceLogo,
        sourceURL: bookmark.sourceURL,
        upVotes: bookmark.upVotes,
        comments: bookmark.comments,
        tags: bookmark.tags,
        createdAt: bookmark.createdAt,
        updatedAt: bookmark.updatedAt,
        id: bookmark.id,
        thumbnail: bookmark.thumbnail,
      };
    } catch (err: any) {
      console.log(err);
      if (err?.response) throw new Error(err.response.data.message);
      throw err;
    }
  },
);

export {addToBookmarks};
