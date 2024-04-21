const Teacher = require("../../models/teacherSchema");

const getTeacherDetails = async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id)
      .populate("teachingSubject", "subName sessions")
      .populate("school", "schoolName")
      .populate("teachingClass", "className");
    if (teacher) {
      teacher.password = undefined;
      res.send(teacher);
    } else {
      res.send({ message: "No teacher found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { getTeacherDetails };
