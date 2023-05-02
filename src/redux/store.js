import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import dashboardSlice from './dashboard/dashboardSlice';
import profileSlice from './profile/profileSlice';
import agencySlice from './agency/agencySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardSlice,
    profile: profileSlice,
    agency: agencySlice,
  },
});
