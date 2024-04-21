const Teacher = require("../../models/teacherSchema");

const getTeachers = async (req, res) => {
  try {
    let teachers = await Teacher.find({ school: req.params.id })
      .populate("teachingSubject", "subName")
      .populate("teachingClass", "className");

    if (teachers.length > 0) {
      let ModifiedTeacher = teachers.map((teacher) => {
        return { ...teacher._doc, password: undefined };
      });
      res.send(ModifiedTeacher);
    } else {
      res.send({ message: "No teachers found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { getTeachers };
