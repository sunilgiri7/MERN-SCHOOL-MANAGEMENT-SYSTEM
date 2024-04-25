import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classesList: [],
  classStudents: [],
  classDetails: [],
  subjectList: [],
  subjectDetails: [],
  loading: false,
  subloading: [],
  error: null,
  response: null,
  getresponse: null,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSubDetailsRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action) => {
      state.classesList = action.payload;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
    },
    getStudentSuccess: (state, action) => {
      state.classStudents = action.payload;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
    },
    getSubjectSuccess: (state, action) => {
      state.subjectList = action.payload;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
    },
    getFailed: (state, action) => {
      state.subjectList = [];
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFailedTwo: (state, action) => {
      state.classesList = [];
      state.classStudents = [];
      state.getresponse = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    detailsSuccess: (state, action) => {
      state.classDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSubDetailsSuccess: (state, action) => {
      state.subjectDetails = action.payload;
      state.subloading = false;
      state.error = null;
    },
    resetSubjects: (state, action) => {
      state.subjectList = [];
      state.classesList = [];
    },
  },
});
export const {
  getRequest,
  getSubDetailsRequest,
  getSuccess,
  getStudentSuccess,
  getSubjectSuccess,
  getFailed,
  getFailedTwo,
  getError,
  detailsSuccess,
  getSubDetailsSuccess,
  resetSubjects,
} = classSlice.actions;
export const classReducer = classSlice.reducer;
