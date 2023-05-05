import {createSlice} from '@reduxjs/toolkit';
//Data for bottomtab
const initialState = {
  plans: [],
  architectList: [],
  customerList: [],
  pastArchitectList: [],
  pastCustomerList: [],
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
    getAgencyArchitectList: (state, data) => {
      const {payload} = data;
      state.architectList = payload;
    },
    getAgencyCustomerList: (state, data) => {
      const {payload} = data;
      state.customerList = payload;
    },
    getAgencyPastArchitectList: (state, data) => {
      const {payload} = data;
      state.pastArchitectList = payload;
    },
    getAgencyPastCustomerList: (state, data) => {
      const {payload} = data;
      state.pastCustomerList = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onPlansListSuccess,
  setAgencyProjectData,
  setAgencyDocData,
  getAgencyArchitectList,
  getAgencyCustomerList,
  getAgencyPastArchitectList,
  getAgencyPastCustomerList,
} = agencySlice.actions;

export default agencySlice.reducer;
