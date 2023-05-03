import {createSlice} from '@reduxjs/toolkit';
//Data for bottomtab
const initialState = {
  plans: [],
  agencyDocData: {
    categoryId: null,
    subCategoryId: null,
    profilePic: null,
    panPic: null,
    agencyName: '',
    gstNum: '',
  },
  agencyAddProjectData: {
    projectName: '',
    address: '',
    images: [],
  },
};

export const agencySlice = createSlice({
  name: 'agency',
  initialState,
  reducers: {
    onPlansListSuccess: (state, data) => {
      const {payload} = data;
      state.plans = payload;
    },
    setAgencyDocData: (state, data) => {
      const {payload} = data;
      state.agencyDocData = payload;
    },
    setAgencyProjectData: (state, data) => {
      const {payload} = data;
      state.agencyAddProjectData = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {onPlansListSuccess, setAgencyProjectData, setAgencyDocData} =
  agencySlice.actions;

export default agencySlice.reducer;
