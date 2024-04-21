const bcrypt = require("bcrypt");
const Teacher = require("../../models/teacherSchema");
const Subject = require("../../models/subjectSchema");

const teacherReg = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      school,
      teachingSubject,
      teachingClass,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassweord = await bcrypt.hash(password, salt);

    const teacher = new Teacher({
      name,
      email,
      password: hashedPassweord,
      role,
      school,
      teachingSubject,
      teachingClass,
    });
    const existingTeacherEmail = await Teacher.findOne({ email });
    if (existingTeacherEmail) {
      res.send({ message: "Email already exists" });
    } else {
      let result = await teacher.save();
      await Subject.findByIdAndUpdate(teachingSubject, {
        teacher: teacher._id,
      });
      result.password = undefined;
      res.send(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { teacherReg };
