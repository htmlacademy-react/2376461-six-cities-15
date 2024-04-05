import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeCard } from '../../types';
import type { AxiosInstance } from 'axios';


export const fetchAllOffers = createAsyncThunk<typeCard[], undefined, {extra: AxiosInstance}>(
  'fetchOffers/all', async (_arg, {extra: api}) => {
    const responce = await api.get<typeCard[]>('/offers');
    return responce.data;
  }
);
