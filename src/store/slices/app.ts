import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesType, SORT_TYPES, SortTypesType } from '../../constants';
import { LOCATIONS } from '../../constants';


type AppState = {
  currentCity: CitiesType;
  currentSort: SortTypesType;
}

const initialState: AppState = {
  currentCity: LOCATIONS.Paris,
  currentSort: SORT_TYPES.Popular,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setCity(state, action: PayloadAction<CitiesType>){
      state.currentCity = action.payload;
    },
    setSort(state,action: PayloadAction<SortTypesType>){
      state.currentSort = action.payload;
    }
  }
});

export const { setCity } = appSlice.actions;
export const { setSort } = appSlice.actions;

export default appSlice;
