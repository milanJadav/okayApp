import {extractData, userAuthFetch, userRawFetch} from './server';

export const getPlans = () =>
  userAuthFetch.get('/paymentplans').then(extractData);

export const savePlanPayment = data =>
  userRawFetch.post('/addagencypayment', data).then(extractData);
