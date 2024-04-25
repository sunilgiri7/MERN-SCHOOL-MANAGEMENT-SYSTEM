import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/UserSlice";
import { studentReducer } from "./studentRelated/studentSlice";
import { teacherReducer } from "./teacherRelated/teacherSlice";
import { ComplainReducer } from "./complainRelated/ComplainSlice";
import { noticeReducer } from "./noticeRelated/NoticeSlicer";
import { classReducer } from "./classRelated/classSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    complain: ComplainReducer,
    notice: noticeReducer,
    class: classReducer,
  },
});
export default store;
