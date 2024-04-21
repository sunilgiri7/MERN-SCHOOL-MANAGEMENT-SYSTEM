const Student = require("../../models/studentSchema");
const Subject = require("../../models/subjectSchema");
const Teacher = require("../../models/teacherSchema");

const sclass = require("../../models/sclassSchema");

const createSubject = async (req, res) => {
  try {
    const subjects = await req.body.subjects.map((subject) => ({
      subName: subject.subName,
      subCode: subject.subCode,
      sessions: subject.sessions,
    }));
    const existingSubjectBySubCode = await Subject.findOne({
      "subjects.subCode": subjects[0].subCode,
      school: req.body.adminID,
    });
    if (existingSubjectBySubCode) {
      res.send({ message: "subCode must be unique" });
    } else {
      const newSubject = subjects.map((subject) => ({
        ...subject,
        className: req.body.className,
        school: req.body.adminID,
      }));
      const result = await Subject.insertMany(newSubject);
      res.send(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allSubject = async (req, res) => {
  try {
    console.log("start");
    let subject = await Subject.find({ school: req.params.id }).populate(
      "className",
      "className"
    );
    console.log(subject);
    if (subject.length > 0) {
      res.send(subject);
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const classSubject = async (req, res) => {
  try {
    const subject = await Subject.find({ className: req.params.id });
    if (subject.length > 0) {
      res.send(subject);
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubjectDetail = async (req, res) => {
  try {
    console.log("start");
    let subject = await Subject.findById(req.params.id);
    console.log(subject);
    if (subject) {
      subject = await subject.populate("className", "className");
      subject = await subject.populate("teacher", "name");
      res.send(subject);
    } else {
      res.send({ message: "No subject found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    console.log("start");
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    console.log(deletedSubject);
    // Set the teachingSubject field to null in teachers
    await Teacher.updateMany(
      { teachingSubject: deletedSubject._id },
      { $unset: { teachingSubject: "" } }
    );

    // Remove the objects containing the deleted subject from students' examResult array
    await Student.updateMany(
      {},
      { $pull: { examResult: { subName: req.params.id } } }
    );

    // Remove the objects containing the deleted subject from students' attendance array
    await Student.updateMany(
      {},
      { $pull: { attendance: { subName: req.params.id } } }
    );
    res.send(deletedSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubjects = async (req, res) => {
  try {
    // Get the subjects to be deleted before performing the deletion
    const subjectsToDelete = await Subject.find({ school: req.params.id });

    // Perform the deletion operation
    const deleteResult = await Subject.deleteMany({ school: req.params.id });
    const deletedCount = deleteResult.deletedCount;

    if (deletedCount > 0) {
      // Set the teachingSubject field to null in teachers
      await Teacher.updateMany(
        {
          teachingSubject: {
            $in: subjectsToDelete.map((subject) => subject._id),
          },
        },
        { $unset: { teachingSubject: "" } }
      );

      // Set examResult and attendance to null in all students
      await Student.updateMany(
        {},
        { $set: { attendance: null, examResult: null } }
      );

      res.send({ deletedCount, deletedSubjects: subjectsToDelete });
    } else {
      // If no subjects were deleted, send empty array for deletedSubjects
      res.send({ deletedCount, deletedSubjects: [] });
    }
  } catch (error) {
    console.error("Error deleting subjects:", error);
    res.status(500).json({ message: "Error deleting subjects" });
  }
};

const deleteSubjectByClass = async (req, res) => {
  try {
    // Get the subjects to be deleted before performing the deletion
    const subjectsToDelete = await Subject.find({ className: req.params.id });

    const deletedResult = await Subject.deleteMany({
      className: req.params.id,
    });
    const deletedCount = deletedResult.deletedCount;

    if (deletedCount > 0) {
      // Set the teachingSubject field to null in teachers
      await Teacher.updateMany(
        {
          teachingSubject: {
            $in: subjectsToDelete.map((subject) => subject._id),
          },
        },
        { $unset: { teachingSubject: "" }, $unset: { teachingSubject: null } }
      );

      // Set examResult and attendance to null in all students
      await Student.updateMany(
        {},
        { $set: { attendance: null, examResult: null } }
      );
    }

    res.send({ deletedCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubject,
  allSubject,
  classSubject,
  getSubjectDetail,
  deleteSubject,
  deleteSubjects,
  deleteSubjectByClass,
};
