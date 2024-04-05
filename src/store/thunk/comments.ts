import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeComment } from '../../types';
import type { AxiosInstance } from 'axios';

//коммент должен браться по id offera
export const fetchAllComments = createAsyncThunk<typeComment[], undefined, {extra: AxiosInstance}>(
  'fetchComments/all', async (_arg, {extra: api}) => {
    const responce = await api.get<typeComment[]>('/comments');
    return responce.data;
  }
);
