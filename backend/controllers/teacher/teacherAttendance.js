const Teacher = require("../../models/teacherSchema");

const teacherAttendance = async (req, res) => {
  const { status, date } = req.body;
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.send("Teacher not found");
    }
    const existingAttendance = teacher.attendance.find((a) => {
      return a.date.toDateString() === new Date(date).toDateString();
    });
    if (existingAttendance) {
      existingAttendance.status = status;
    } else {
      teacher.attendance.push({ date, status });
    }
    const result = await teacher.save();
    return res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { teacherAttendance };
