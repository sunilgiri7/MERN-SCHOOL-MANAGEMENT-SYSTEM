const Teacher = require("../../models/teacherSchema");
const Subject = require("../../models/subjectSchema");
const bcrypt = require("bcrypt");

const deleteTeacher = async (req, res) => {
  const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
  if (!deletedTeacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  await Subject.updateOne(
    {
      teacher: deletedTeacher._id,
      teacher: { $exists: true },
    },
    {
      $unset: { teacher: 1 },
    }
  );
  res
    .status(200)
    .json({ message: "Teacher deleted successfully", deletedTeacher });
  try {
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { deleteTeacher };
