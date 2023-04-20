import {extractData, userAuthFetch} from './server';

export const getCategory = () =>
  userAuthFetch.get('/viewcategory').then(extractData);
