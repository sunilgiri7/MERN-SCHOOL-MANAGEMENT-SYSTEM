const bcrypt = require("bcrypt");
const Student = require("../../models/studentSchema");
const sclass = require("../../models/sclassSchema");

const getStudentDetail = async (req, res) => {
  try {
    let student = await Student.findById(req.params.id)
      .populate("school", "schoolName")
      .populate("className", "className")
      .populate("examResult.subName", "subName")
      .populate("attendance.subName", "subName sessions");
    if (student) {
      student.password = undefined;
      res.send(student);
    } else {
      res.send({ message: "No student found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { getStudentDetail };
