const Class = require("../../models/sclassSchema");
const Student = require("../../models/studentSchema");
const Subject = require("../../models/subjectSchema");
const Teacher = require("../../models/teacherSchema");

const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.send({ message: "Class not found" });
    }
    const deletedStudents = await Student.deleteMany({
      className: req.params.id,
    });
    const deletedSubject = await Subject.deleteMany({
      className: req.params.id,
    });
    const deletedTeacher = await Teacher.deleteMany({
      className: req.params.id,
    });
    res.send(deletedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteClasses = async (req, res) => {
  try {
    const deletedClass = await Class.deleteMany({ school: req.params.id });
    if (deletedClass.deletedCount === 0) {
      return res.send({ message: "No Classes found to delete" });
    }
    const deletedStudents = await Student.deleteMany({
      school: req.params.id,
    });
    const deletedSubject = await Subject.deleteMany({
      school: req.params.id,
    });
    const deletedTeacher = await Teacher.deleteMany({
      school: req.params.id,
    });
    res.send(deletedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteClass, deleteClasses };
