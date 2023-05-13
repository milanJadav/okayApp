import {extractData, userAuthFetch, userRawFetch} from './server';

export const getProfile = data =>
  userAuthFetch.post('/viewprofile', data).then(extractData);

export const updateProfileData = data =>
  userRawFetch.post('/saveprofile', data).then(extractData);
