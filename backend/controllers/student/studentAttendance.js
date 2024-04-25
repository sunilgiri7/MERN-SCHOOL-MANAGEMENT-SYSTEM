const Student = require("../../models/studentSchema");
const Subject = require("../../models/subjectSchema");

const studentAttendance = async (req, res) => {
  const { subName, status, date } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.send({ message: "Student not found" });
    }
    const sub = await Subject.findById(subName);
    const existingAttendance = student.attendance.find(
      (a) =>
        a.date.toDateString() === new Date(date).toDateString() &&
        a.subName.toString() === subName
    );
    if (existingAttendance) {
      existingAttendance.status = status;
    } else {
      const attendanceSessions = student.attendance.filter(
        (a) => a.subName.toString() === subName
      ).length;

      if (attendanceSessions >= sub.sessions) {
        return res.send({ message: "Maximum attendance limit reached" });
      }
      student.attendance.push({ date, status, subName });
    }
    const result = await student.save();
    return res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearAllStudentAttendanceBySubject = async (req, res) => {
  const subName = req.params.id;
  try {
    const result = await Student.updateMany(
      { "attendance.subName": subName },
      { $pull: { attendance: { subName } } }
    );
    return res.send(result);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
};

const clearAllStudentAttendance = async (req, res) => {
  const schoolId = req.params.id;
  try {
    const result = await Student.updateMany(
      { school: schoolId },
      { $set: { attendance: [] } }
    );
    return res.send(result);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
};
module.exports = {
  studentAttendance,
  clearAllStudentAttendanceBySubject,
  clearAllStudentAttendance,
};
