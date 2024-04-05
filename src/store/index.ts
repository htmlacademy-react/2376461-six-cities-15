import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { createAPI } from '../api/api';
import appSlice from './slices/app';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [appSlice.name]: appSlice.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: createAPI()}}),
  reducer
});
