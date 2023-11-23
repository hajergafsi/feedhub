import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getReadingHistory} from '../thunks';

interface IReadingHistory {
  /*  activities: {id: string; feed: IFeed}[]; */
  activities: string[];
  date: string;
}

interface IState {
  history: IReadingHistory[];
}

const initialState: IState = {
  history: [],
};

const readingHistorySlice = createSlice({
  name: 'readingHistory',
  initialState,
  reducers: {
    setHistory(state, {payload}: PayloadAction<IReadingHistory[]>) {
      state.history = payload;
    },
    removeFromHistory(state, {payload}: PayloadAction<String>) {
      state.history.forEach(item => {
        item.activities = [...item.activities].filter(elem => {
          JSON.parse(elem).feed.id !== payload;
        });
      });
    },
  },
  extraReducers(build) {
    build.addCase(
      getReadingHistory.fulfilled,
      (state, {payload}: PayloadAction<IReadingHistory[]>) => {
        //state.history = payload;
        state.history = [];
        payload.forEach(item => {
          state.history.push({
            date: item.date,
            activities: item.activities.map(activity =>
              JSON.stringify(activity),
            ),
          });
        });
      },
    );
  },
});

const readingHistoryReducer = readingHistorySlice.reducer;
export const {setHistory, removeFromHistory} = readingHistorySlice.actions;
export {readingHistoryReducer};
