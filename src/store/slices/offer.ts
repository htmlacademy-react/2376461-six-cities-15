import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../constants';
import { typeCard, typeComment, typeOffer } from '../../types';

import { fetchOffer } from '../thunk/offer';
import { fetchNearby } from '../thunk/nearby';
import { fetchAllComments, postComment } from '../thunk/comments';


type OfferState = {
  nearby: typeCard[];
  offer: typeOffer | null;
  status: RequestStatus;
  commentStatus: RequestStatus;
  comments: typeComment[];
}

const initialState: OfferState = {
  nearby: [],
  offer: null,
  status: RequestStatus.Loading,
  commentStatus: RequestStatus.Idle,
  comments: []
};

const offerSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchNearby.fulfilled, (state, action) => {
        state.nearby = action.payload;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.commentStatus = RequestStatus.Idle;
      }),
  initialState,
  name: 'offer',
  reducers: {
    setCommentStatus(state, action: PayloadAction<RequestStatus>){
      state.commentStatus = action.payload;
    },
  },
});

const offerActions = offerSlice.actions;

const offerSelectors = {
  nearby: (state: { offer: OfferState }) => state.offer.nearby,
  offer: (state: { offer: OfferState }) => state.offer.offer,
  offerStatus: (state: { offer: OfferState }) => state.offer.status,
  commentStatus: (state: { offer: OfferState }) => state.offer.commentStatus,
  comments: (state: { offer: OfferState }) => state.offer.comments,
};

export {
  offerActions,
  offerSelectors,
  offerSlice
};
