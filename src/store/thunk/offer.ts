import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeOffer } from '../../types';
import type { AxiosInstance } from 'axios';

export const fetchOffer = createAsyncThunk<typeOffer, string, {extra: AxiosInstance}>(
  'fetchOffers/offer', async (offerId, {extra: api}) => {
    const responce = await api.get<typeOffer>(`/offers/${offerId}`);
    return responce.data;
  }
);
