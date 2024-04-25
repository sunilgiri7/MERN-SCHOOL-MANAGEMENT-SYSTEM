import axios from "axios";
import {
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
} from "./classSlice";

export const getAllclasses = (id, address) => async (dispatch) => {
  dispatch(getRequest);
  try {
    const result = await axios.get(
      `http://localhost:3000/${address}List/${id}`
    );
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getClassStudent = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`http://localhost:3000/class/Student/${id}`);
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getStudentSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getClassDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`http://localhost:3000/${address}/${id}`);
    if (result.data) {
      dispatch(detailsSuccess(result.data));
    } else {
      dispatch(getError(result.data.message));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getSubjectList = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`http://localhost:3000/${address}/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSubjectSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`http://localhost:3000/classSubject/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSubjectSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getSubjectDetails = (id, address) => async (dispatch) => {
  try {
    const result = await axios.get(`http://localhost:3000/${address}/${id}`);
    if (result.data) {
      dispatch(getSubDetailsSuccess(result.data));
    } else {
      dispatch(getError(result.data.message));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
