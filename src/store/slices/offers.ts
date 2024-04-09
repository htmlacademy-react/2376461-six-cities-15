import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../constants';
import { typeCard, typeOffer } from '../../types';

import { fetchAllOffers, fetchFavoriteOffers } from '../thunk/offers';


type OffersState = {
  activeID: typeCard['id'] | null;
  offers: typeCard[];
  favorites: typeOffer[];
  status: RequestStatus;
}

type TypeChangeFavorite = {
  offerId: typeOffer['id'] | null;
  favoriteStatus: number;
  isNearest?: false;
}

const initialState: OffersState = {
  activeID: null,
  offers: [],
  favorites: [],
  status: RequestStatus.Loading,
};
//почему RequestStatus.Loading?? а не Idle - потому что idle 0 и проверка на Loading в main не отработате и будет error
const offersSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state,action) => {
        state.favorites = action.payload;
      }),
  initialState,
  name: 'offers',
  reducers: {
    changeIsFavorite(state, action: PayloadAction<TypeChangeFavorite>){
      const { offerId, favoriteStatus } = action.payload;

      const status = Boolean(favoriteStatus);
      const favoriteOffer = state.offers.find((offer) => offer.id === offerId);

      const offerIndex = state.offers.findIndex((offer) => offer.id === offerId);
      state.offers[offerIndex].isFavorite = status;
      if(status){
        state.favorites.push(favoriteOffer as typeOffer);
      }else{
        state.favorites = state.favorites.filter((favorite) => favorite.id !== offerId);
      }
    }
  },
});

const offersActions = offersSlice.actions;

const offersSelectors = {
  activeId: (state: { offers: OffersState }) => state.offers.activeID,
  offers: (state: { offers: OffersState }) => state.offers.offers,
  offersStatus: (state: { offers: OffersState }) => state.offers.status,
  favorites: (state: { offers: OffersState }) => state.offers.favorites,
};
export const {changeIsFavorite} = offersSlice.actions;

export {
  offersActions,
  offersSelectors,
  offersSlice
};
