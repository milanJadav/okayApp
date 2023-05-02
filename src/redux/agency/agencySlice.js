import {createSlice} from '@reduxjs/toolkit';
//Data for bottomtab
const initialState = {
  plans: [],
};

export const agencySlice = createSlice({
  name: 'agency',
  initialState,
  reducers: {
    onPlansListSuccess: (state, data) => {
      const {payload} = data;
      state.plans = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {onPlansListSuccess} = agencySlice.actions;

export default agencySlice.reducer;
