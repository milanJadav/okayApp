import {createSlice} from '@reduxjs/toolkit';
//Data for bottomtab
const initialState = {
  categoryData: [],
  subCategoryData: [],
  projectsData: [],
  pastProjectsData: [],
  projectDetail: {},
  categorySearchData: [],
  categoryWiseAgency: [],
  allAgencyData: [],
  agencyDetails: {},
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
    onGetPastProjectsSuccess: (state, data) => {
      const {payload} = data;
      state.pastProjectsData = payload;
    },
    onGetProjectDetailSuccess: (state, data) => {
      const {payload} = data;
      state.projectDetail = payload;
    },

    onSearchCategorySuccess: (state, data) => {
      const {payload} = data;
      state.categorySearchData = payload;
    },
    onCategoryWiseAgencySuccess: (state, data) => {
      const {payload} = data;
      state.categoryWiseAgency = payload;
    },
    onAllAgencySuccess: (state, data) => {
      const {payload} = data;
      state.allAgencyData = payload;
    },
    onAgencyDetailSuccess: (state, data) => {
      const {payload} = data;
      state.agencyDetails = payload;
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
  onGetPastProjectsSuccess,
  onCategoryWiseAgencySuccess,
  onAllAgencySuccess,
  onAgencyDetailSuccess,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
