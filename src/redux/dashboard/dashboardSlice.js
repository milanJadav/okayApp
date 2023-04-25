import {createSlice} from '@reduxjs/toolkit';
//Data for bottomtab
const initialState = {
  categoryData: [],
  subCategoryData: [],
  projectsData: [],
  projectDetail: {},
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
    onSubCategorySuccess: (state, data) => {
      const {payload} = data;
      state.subCategoryData = payload;
    },
    onGetProjectsSuccess: (state, data) => {
      const {payload} = data;
      state.projectsData = payload;
    },
    onGetProjectDetailSuccess: (state, data) => {
      const {payload} = data;
      state.projectDetail = payload;
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
  onSubCategorySuccess,
  onGetProjectsSuccess,
  onSearchCategorySuccess,
  onGetProjectDetailSuccess,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
