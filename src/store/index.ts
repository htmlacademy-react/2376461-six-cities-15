import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice} from './slices/offers';
import { offerSlice } from './slices/offer';
import { createAPI } from '../api/api';
import appSlice from './slices/app';
import { userSlice } from './slices/user';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [appSlice.name]: appSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [userSlice.name]: userSlice.reducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: createAPI()}}),
  reducer
});

export type APPdispatch = typeof store.dispatch;
