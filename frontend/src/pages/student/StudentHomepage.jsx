import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/UserHandle";
import { getSubjectList } from "../../redux/classRelated/classHandle";
import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculate";
import { Container, Grid, Typography } from "@mui/material";
// import SubjectCard from "./SubjectCard";
// import AssignmentCard from "./AssignmentCard";
// import AttendanceChart from "./AttendanceChart";
import SeeNotice from "../../components/SeeNotice";

const StudentHomepage = () => {
  const dispatch = useDispatch();
  const { userDetails, currentUser, loading, response } = useSelector(
    (state) => state.user
  );
  const { subjectList } = useSelector((state) => state.class);
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const classID = currentUser.className;

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "getStudentDetails"));
    dispatch(getSubjectList(classID, "classSubject"));
  }, [dispatch, currentUser._id, classID]);

  const numberOfSubjects = subjectList && subjectList.length;

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;
  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
          {/* <SubjectCard numberOfSubjects={numberOfSubjects} /> */}
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          {/* <AssignmentCard /> */}
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          {/* <AttendanceChart
            response={response}
            loading={loading}
            subjectAttendance={subjectAttendance}
            chartData={chartData}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <SeeNotice />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentHomepage;
