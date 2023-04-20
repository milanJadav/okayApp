import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categoryData: [],
  projectsData: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    onCategorySuccess: (state, data) => {
      const {payload} = data;
      state.categoryData = payload;
    },
    onGetProjectsSuccess: (state, data) => {
      const {payload} = data;
      console.log('in reducer', payload);
      state.projectsData = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {onCategorySuccess, onGetProjectsSuccess} = dashboardSlice.actions;

export default dashboardSlice.reducer;
