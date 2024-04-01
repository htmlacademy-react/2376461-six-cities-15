import { createReducer } from '@reduxjs/toolkit';
import { LOCATIONS, CitiesType, SortTypesType, SORT_TYPES } from '../constants';
import { typeCard } from '../types.ts';
import { changeCityAction, changeSortAction, setOffersAction } from './actions.ts';
import { cardsData } from '../mock/card-data.ts';

type InitialStateProps = {
  currentCity: CitiesType;
  currentSort: SortTypesType;
  offers: typeCard[];
};

const initialState: InitialStateProps = {
  currentCity: LOCATIONS.Paris,
  currentSort: SORT_TYPES.Popular,
  offers: cardsData,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortAction, (state,action) => {
      state.currentSort = action.payload;
    });
});

