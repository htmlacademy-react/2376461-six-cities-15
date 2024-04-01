import { createReducer } from '@reduxjs/toolkit';
import { LOCATIONS, CitiesType } from '../constants';
import { typeCard } from '../types.ts';
import { changeCityAction, setOffersAction } from './actions.ts';
import { cardsData } from '../mock/card-data.ts';

type InitialStateProps = {
  currentCity: CitiesType;
  offers: typeCard[];
};

const initialState: InitialStateProps = {
  currentCity: LOCATIONS.Paris,
  offers: cardsData,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffersAction, (state, action) => {
      state.offers = action.payload;
    });
});

