const Student = require("../../models/studentSchema");

const updateExamResult = async (req, res) => {
  const { subName, marksObtained } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.send({ message: "Student not found" });
    }
    const existingStudent = student.examResult.find(
      (result) => result.subName.toString() === subName
    );
    if (existingStudent) {
      existingStudent.marksObtained = marksObtained;
    } else {
      student.examResult.push({ subName, marksObtained });
    }
    const result = await student.save();
    return res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateExamResult };
