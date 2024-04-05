import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { getToken } from './token';

const BASE_URL: string = 'https://15.design.htmlacademy.pro/six-cities';
const TIME_OUT: number = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if(token && config.headers){
      config.headers['X-Token'] = token;
    }

    return config;
  });
  return api;
};

