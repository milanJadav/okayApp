import {extractData, userAuthFetch} from './server';

export const getCategory = () =>
  userAuthFetch.get('/viewcategory').then(extractData);

export const getProjects = () =>
  userAuthFetch.get('/viewproject').then(extractData);
