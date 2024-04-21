const Class = require("../../models/sclassSchema");
const Student = require("../../models/studentSchema");

const classList = async (req, res) => {
  try {
    const sclass = await Class.find({ school: req.params.id });
    if (sclass.length > 0) {
      res.send(sclass);
    } else {
      res.send({ message: "No class found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClassDetail = async (req, res) => {
  try {
    let sclass = await Class.findById(req.params.id);
    if (sclass) {
      sclass = await sclass.populate("school", "schoolName");
      res.send(sclass);
    } else {
      res.send({ message: "No class found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClassStudents = async (req, res) => {
  try {
    let students = await Student.find({ className: req.params.id });
    if (students && students.length > 0) {
      let modifiedStudent = students.map((student) => {
        return { ...student._doc, password: undefined };
      });
      res.send(modifiedStudent);
    } else {
      res.send({ message: "No students found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { classList, getClassDetail, getClassStudents };
