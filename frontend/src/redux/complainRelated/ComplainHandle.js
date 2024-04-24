import axios from "axios";
import { getRequest, getSuccess, getFailed, getError } from "./ComplainSlice";

export const getAllComplain = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(
      `http://localhost:3000/${address}List/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
