import { createAction } from '@reduxjs/toolkit';
import { CitiesType, SortTypesType } from '../constants';
import { typeOffer } from '../types';

const ACTIONS = {
  changeCity: 'main/changeCity',
  setOffers: 'main/setOffers',
  changeSort: 'main/changeSort',
};

const changeCityAction = createAction(
  ACTIONS.changeCity,
  (city: CitiesType) => ({
    payload: city,
  }),
);

const setOffersAction = createAction(
  ACTIONS.setOffers,
  (offers: typeOffer[]) => ({
    payload: offers,
  }),
);

const changeSortAction = createAction(
  ACTIONS.changeSort,
  (sort: SortTypesType) => ({
    payload: sort,
  }),
);

export {
  setOffersAction,
  changeCityAction,
  changeSortAction,
};
