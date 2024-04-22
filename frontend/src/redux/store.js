import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/UserSlice";
import { studentReducer } from "./studentRelated/studentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
  },
});
export default store;
