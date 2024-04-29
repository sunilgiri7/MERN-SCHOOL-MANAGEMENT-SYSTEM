import axios from "axios";

import {
  getRequest,
  doneSuccess,
  getSuccess,
  getFailed,
  getError,
  postDone,
} from "./teacherSlice";

export const getAllTeachers = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`http://localhost:3000/getteachers/${id}`);
    // console.log(result);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const getTeacherDetails = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`http://localhost:3000/Teacher/${id}`);
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const updateTeachSubject =
  (teacherId, teachingSubject) => async (dispatch) => {
    dispatch(getRequest());
    try {
      await axios.put(
        `http://localhost:3000/TeacherSubject/`,
        {
          teacherId,
          teachingSubject,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch(postDone());
    } catch (error) {
      dispatch(getError(error));
    }
  };
