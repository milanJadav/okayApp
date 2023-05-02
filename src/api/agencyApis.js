import {extractData, userAuthFetch} from './server';

export const getPlans = () =>
  userAuthFetch.get('/paymentplans').then(extractData);
