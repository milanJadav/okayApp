import {extractData, userAuthFetch} from './server';

export const signIn = data =>
  userAuthFetch.post('/register', data).then(extractData);

export const verifyOtp = data =>
  userAuthFetch.post('/login', data).then(extractData);

export const updateUserType = data =>
  userAuthFetch.post('/editusertype', data).then(extractData);
