import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categoryData: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    onCategorySuccess: (state, data) => {
      const {payload} = data;
      state.categoryData = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {onCategorySuccess} = dashboardSlice.actions;

export default dashboardSlice.reducer;
