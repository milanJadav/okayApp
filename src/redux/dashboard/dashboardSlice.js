import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categoryData: [],
  projectsData: [],
  categorySearchData: [],
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
      state.projectsData = payload;
    },

    onSearchCategorySuccess: (state, data) => {
      const {payload} = data;
      state.categorySearchData = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onCategorySuccess,
  onGetProjectsSuccess,
  onSearchCategorySuccess,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
