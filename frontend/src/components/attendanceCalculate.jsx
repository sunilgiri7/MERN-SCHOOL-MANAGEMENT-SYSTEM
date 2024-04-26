export const calculateSubjectAttendancePercentage = (
  persentCount,
  totalSessions
) => {
  if (persentCount === 0 || totalSessions === 0) {
    return 0;
  }
  const percentage = (persentCount / totalSessions) * 100;
  return percentage.toFixed(2);
};

export const groupAttendanceBySubject = (subjectAttendance) => {
  const attendanceBySubject = {};
  subjectAttendance.forEach((attendance) => {
    const subName = attendance.subName.subName;
    const sessions = attendance.subName.sessions;
    const subId = attendance.subName._id;

    if (!attendanceBySubject[subName]) {
      attendanceBySubject[subName] = {
        persent: 0,
        absent: 0,
        sessions: sessions,
        allData: [],
        subId: subId,
      };
    }
    if (attendance.status === "Present") {
      attendanceBySubject[subName].persent++;
    } else if (attendance.status === "Absent") {
      attendanceBySubject[subName].absent++;
    }
    attendanceBySubject[subName].allData.push({
      date: attendance.date,
      status: attendance.status,
    });
  });
  return attendanceBySubject;
};

export const calculateOverallAttendancePercentage = (subjectAttendance) => {
  let totalSessionsSumm = 0;
  let persentCountSum = 0;
  const uniqueSubIds = [];

  subjectAttendance.forEach((attendance) => {
    const subId = attendance.subName._id;
    if (!uniqueSubIds.includes(subId)) {
      const sessions = parseInt(attendance.subName.sessions);
      totalSessionsSumm += sessions;
      uniqueSubIds.push(subId);
    }
    persentCountSum += attendance.status === "Present" ? 1 : 0;
  });
  if (totalSessionsSumm === 0 || persentCountSum === 0) {
    return 0;
  }
  console.log(persentCountSum);
  // console.log(totalSessionsSumm);
  console.log((persentCountSum / 100) * 100);
  return (persentCountSum / 100) * 100;
};
