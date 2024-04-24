import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  complainList: [],
  loading: false,
  error: null,
  response: null,
};

const ComplainSlice = createSlice({
  name: "complain",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action) => {
      state.complainList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { getRequest, getSuccess, getFailed, getError } =
  ComplainSlice.actions;
export const ComplainReducer = ComplainSlice.reducer;
