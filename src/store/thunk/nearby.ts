import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeCard } from '../../types';
import type { AxiosInstance } from 'axios';
//fetchNearbyAction TypeCard

export const fetchNearby = createAsyncThunk<typeCard[], string, {extra: AxiosInstance}>(
  'fetchOffers/near', async (offerId, {extra: api}) => {
    const responce = await api.get<typeCard[]>(`/offers/${offerId}/nearby`);
    return responce.data;
  }
);
