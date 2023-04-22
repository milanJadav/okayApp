import axios from 'axios';
import {localStorageHelper, StorageKeys} from '../Common/localStorageHelper';
import {ENVIRONMENT} from '../Environment';

export const BASE_URL = ENVIRONMENT.baseUrl;

const axiosOptions = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const userAuthFetch = axios.create(axiosOptions);

// Adding headers to requests
userAuthFetch.interceptors.request.use(config =>
  localStorageHelper
    .getItemFromStorage(StorageKeys.ACCESS_TOKEN)
    .then(tokenResponse => {
      config.headers.authorization = `Bearer ${tokenResponse}`;
      console.log(`API called: ${config.url}`);
      return Promise.resolve(config);
    }),
);

export const extractData = r => r.data;
