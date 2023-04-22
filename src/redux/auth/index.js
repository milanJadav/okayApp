import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  architectWorkType: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, data) => {
      // const {
      //   payload: {item},
      // } = data;
      // console.log('iam in reduxer', data);
    },
    getArchitectWorkTypesSuccess: (state, data) => {
      const {payload} = data;
      state.architectWorkType = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {onLogin, getArchitectWorkTypesSuccess} = authSlice.actions;

export default authSlice.reducer;
