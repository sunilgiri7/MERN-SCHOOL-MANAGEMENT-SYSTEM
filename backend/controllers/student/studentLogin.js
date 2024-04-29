const bcrypt = require("bcrypt");
const Student = require("../../models/studentSchema");
const Subject = require("../../models/subjectSchema");

const studentLogin = async (req, res) => {
  try {
    console.log(req.body.rollNum);
    console.log(req.body.name);
    const student = await Student.findOne({
      rollNum: req.body.rollNum,
      name: req.body.name,
    });
    // console.log(student);
    if (student) {
      const validated = await bcrypt.compare(
        req.body.password,
        student.password
      );
      if (validated) {
        student.password = undefined;
        student.examResult = undefined;
        student.attendance = undefined;
        res.send(student);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { studentLogin };
