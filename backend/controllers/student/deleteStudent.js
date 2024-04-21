const Student = require("../../models/studentSchema");

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.send("Student deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudents = async (req, res) => {
  try {
    const result = await Student.deleteMany({ school: req.params.id });
    if (result.deletedCount === 0) {
      res.send("No students found to delete");
    } else {
      res.send("Students deleted successfully");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudentByClass = async (req, res) => {
  try {
    const result = await Student.deleteMany({ className: req.params.id });
    if (result.deletedCount === 0) {
      res.send("No students found to delete");
    } else {
      res.send("Students deleted successfully");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteStudent, deleteStudents, deleteStudentByClass };
