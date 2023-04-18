import {extractData, userAuthFetch} from './server';

export const signIn = data =>
  userAuthFetch.post('/register', data).then(extractData);

// export const signInOtpVerification = data => userAuthFetch
// 	.post(signInOTPVerifyApi, data)
// 	.then(extractData);
