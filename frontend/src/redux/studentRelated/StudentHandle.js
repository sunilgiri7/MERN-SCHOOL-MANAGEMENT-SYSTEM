import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
} from "./studentSlice";

export const getAllStudents = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`/Students/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const updateStudentField = (id, fields, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.put(`/${address}/${id}`, fields, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const removeStuffs = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.put(`/${address}/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
