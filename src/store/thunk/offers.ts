import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeCard, typeOffer } from '../../types';
import type { AxiosInstance } from 'axios';


export const fetchAllOffers = createAsyncThunk<typeCard[], undefined, {extra: AxiosInstance}>(
  'fetchOffers/all', async (_arg, {extra: api}) => {
    const responce = await api.get<typeCard[]>('/offers');
    return responce.data;
  }
);

export const fetchFavoriteOffers = createAsyncThunk<typeOffer[], undefined, {extra: AxiosInstance}>(
  'fetchOffers/favorites', async (_arg, {extra: api}) => {
    const responce = await api.get<typeOffer[]>('/favorite');
    return responce.data;
  }
);
///{offerId}/{status}
type typeChangeFavorite = {
  offerId: string;
  status: number;
}
export const changeFavoriteStatus = createAsyncThunk<typeChangeFavorite, {offerId: string; status: number}, {extra: AxiosInstance}>(
  'fetchOffers/changeFavorites', async ({offerId, status}, {extra: api}) => {
    const responce = await api.post<typeChangeFavorite>(`/favorite/${offerId}/${status}`);
    return responce.data;
  }
);
