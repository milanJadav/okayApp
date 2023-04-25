import {extractData, userAuthFetch} from './server';

export const getCategory = () =>
  userAuthFetch.get('/viewcategory').then(extractData);

export const getSubCategorys = data =>
  userAuthFetch.post('/viewsubcategory', data).then(extractData);

export const getProjects = data =>
  userAuthFetch.post('/projects', data).then(extractData);

export const getProjectDetails = data =>
  userAuthFetch.post('/viewprojectdetails', data).then(extractData);

export const searchCategory = text =>
  userAuthFetch.post('/searchcategory', text).then(extractData);
