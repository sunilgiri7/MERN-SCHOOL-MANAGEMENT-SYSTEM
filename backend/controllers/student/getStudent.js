const bcrypt = require("bcrypt");
const Student = require("../../models/studentSchema");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({ school: req.params.id });
    if (students.length > 0) {
      let modifiedStudents = students.map((student) => {
        return { ...student._doc, password: undefined };
      });
      res.send(modifiedStudents);
    } else {
      res.send({ message: "No students found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { getStudents };
