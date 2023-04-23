import {extractData, userAuthFetch, userRawFetch} from './server';

export const signIn = data =>
  userAuthFetch.post('/register', data).then(extractData);

export const verifyOtp = data =>
  userAuthFetch.post('/login', data).then(extractData);

export const updateUserType = data =>
  userAuthFetch.post('/editusertype', data).then(extractData);

export const getArchitectWorkTypes = data =>
  userAuthFetch.get('/viewworktype').then(extractData);

export const saveArchitectWorkTypes = data =>
  userRawFetch.post('/saveworktype', data).then(extractData);

export const saveProject = data =>
  userRawFetch.post('/saveproject', data).then(extractData);
