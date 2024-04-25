import axios from "axios";
import { getRequest, getSuccess, getFailed, getError } from "./NoticeSlicer";

export const getAllNotices = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    console.log(address);
    const result = await axios.get(
      `http://localhost:3000/${address}List/${id}`
    );
    console.log("hsjbcqsbjq");
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
