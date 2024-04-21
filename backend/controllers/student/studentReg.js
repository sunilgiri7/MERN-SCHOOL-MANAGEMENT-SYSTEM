const bcrypt = require("bcrypt");
const Student = require("../../models/studentSchema");
const Subject = require("../../models/subjectSchema");

const studentReg = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const existingStudent = await Student.findOne({
      rollNum: req.body.rollNum,
      school: req.body.school,
      className: req.body.className,
    });
    if (existingStudent) {
      res.send({ message: "Roll Number already exists" });
    } else {
      const student = new Student({
        name: req.body.name,
        rollNum: req.body.rollNum,
        password: hashedPassword,
        className: req.body.className,
        school: req.body.adminID,
        role: req.body.role || "Student",
      });
      let result = await student.save();
      result.password = undefined;
      res.send(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { studentReg };
