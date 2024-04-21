const Teacher = require("../../models/teacherSchema");
const bcrypt = require("bcrypt");

const TeacherLogin = async (req, res) => {
  try {
    let teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher) {
      const login = await bcrypt.compare(req.body.password, teacher.password);
      if (login) {
        teacher = await teacher.populate("teachingSubject", "subName sessions");
        teacher = await teacher.populate("school", "schoolName");
        teacher = await teacher.populate("teachingClass", "className");
        teacher.password = undefined;
        res.send(teacher);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = { TeacherLogin };
