import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
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
  },
});

// Action creators are generated for each case reducer function
export const {onLogin} = authSlice.actions;

export default authSlice.reducer;
