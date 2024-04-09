import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthenticatedUserType } from '../../types';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../../api/token';

type LoginData = {
  email: string;
  password: string;
}

export const checkAuth = createAsyncThunk<AuthenticatedUserType,undefined, { extra: AxiosInstance}>(
  'auth/checkAuth', async (_arg, {extra: api}) => {
    const responce = await api.get<AuthenticatedUserType>('/login');
    return responce.data;
  }
);

export const login = createAsyncThunk<AuthenticatedUserType,LoginData, { extra: AxiosInstance}>(
  'auth/login', async (body, {extra: api}) => {
    const responce = await api.post<AuthenticatedUserType>('/login', body);

    saveToken(responce.data.token);
    return responce.data;
  }
);

export const logout = createAsyncThunk<unknown,undefined, { extra: AxiosInstance}>(
  'auth/logout', async (_arg, {extra: api}) => {
    const responce = await api.delete<AuthenticatedUserType>('/logout');

    dropToken();
    return responce.data;
  }
);
