import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../constants';
import { typeCard, typeOffer } from '../../types';

import { fetchAllOffers } from '../thunk/offers';


type OffersState = {
  activeID: typeCard['id'] | null;
  offers: typeCard[];
  status: RequestStatus;
}

const initialState: OffersState = {
  activeID: null,
  offers: [],
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
      }),
  initialState,
  name: 'offers',
  reducers: {
    setActiveId(state, action: PayloadAction<typeOffer['id'] | null>){
      state.activeID = action.payload;
    }
  },
});

const offerActions = offersSlice.actions;

const offersSelectors = {
  activeId: (state: { offers: OffersState }) => state.offers.activeID,
  offers: (state: { offers: OffersState }) => state.offers.offers,
  offersStatus: (state: { offers: OffersState }) => state.offers.status,
};

export {
  offerActions,
  offersSelectors,
  offersSlice
};
