import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import dashboardSlice from './dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardSlice,
  },
});
