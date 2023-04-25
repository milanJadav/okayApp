import {extractData, userAuthFetch} from './server';

export const getCategory = () =>
  userAuthFetch.get('/viewcategory').then(extractData);

export const getProjects = data =>
  userAuthFetch.post('/projects', data).then(extractData);

export const searchCategory = text =>
  userAuthFetch.post('/searchcategory', text).then(extractData);
