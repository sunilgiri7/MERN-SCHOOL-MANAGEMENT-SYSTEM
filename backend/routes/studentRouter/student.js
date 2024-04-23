const express = require("express");
const router = express.Router();
const { studentReg } = require("../../controllers/student/studentReg");
const { studentLogin } = require("../../controllers/student/studentLogin");
const { getStudents } = require("../../controllers/student/getStudent");
const {
  getStudentDetail,
} = require("../../controllers/student/getStudentDetails");
const {
  deleteStudent,
  deleteStudents,
  deleteStudentByClass,
} = require("../../controllers/student/deleteStudent");
const { updateExamResult } = require("../../controllers/student/stExamResult");
const {
  studentAttendance,
  clearAllStudentAttendanceBySubject,
  clearAllStudentAttendance,
} = require("../../controllers/student/studentAttendance");

router.post("/studentReg", studentReg);
router.post("/StudentLogin", studentLogin);
router.get("/getStudent/:id", getStudents);
router.get("/getStudentDetails/:id", getStudentDetail);
router.get("/deleteStudent/:id", deleteStudent);
router.get("/deleteStudents/:id", deleteStudents);
router.get("/deleteStudentByClass/:id", deleteStudentByClass);
router.get("/updateStudentResult/:id", updateExamResult);
router.post("/StudentAttendance/:id", studentAttendance);
router.post(
  "/clearAllStudentAttendanceBySub/:id",
  clearAllStudentAttendanceBySubject
);
router.post("/clearAllStudentAttendance/:id", clearAllStudentAttendance);

module.exports = router;
