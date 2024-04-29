const express = require("express");
const router = express.Router();

const { teacherReg } = require("../../controllers/teacher/addTeacher");
const { TeacherLogin } = require("../../controllers/teacher/loginTeacher");
const { getTeachers } = require("../../controllers/teacher/getTeacher");
const {
  getTeacherDetails,
} = require("../../controllers/teacher/getTeacherDetails");
const {
  updateTeacherSub,
} = require("../../controllers/teacher/updateTeacherSubs");
const { deleteTeacher } = require("../../controllers/teacher/deleteTeacher");
const {
  teacherAttendance,
} = require("../../controllers/teacher/teacherAttendance");

router.post("/teacherReg", teacherReg);
router.post("/teacherlogin", TeacherLogin);
router.get("/getteachers/:id", getTeachers);
router.post("/getteachersdetail/:id", getTeacherDetails);
router.post("/updateTeacherSubs", updateTeacherSub);
router.post("/deleteTeacher/:id", deleteTeacher);
router.post("/teacherAttendance/:id", teacherAttendance);

module.exports = router;
