const Teacher = require("../../models/teacherSchema");
const Subject = require("../../models/subjectSchema");
const bcrypt = require("bcrypt");

const updateTeacherSub = async (req, res) => {
  const { teacherId, teachingSubject } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        teachingSubject,
      },
      { new: true }
    );
    await Subject.findByIdAndUpdate(teachingSubject, {
      teacher: updatedTeacher._id,
    });
    res.send(updatedTeacher);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { updateTeacherSub };
