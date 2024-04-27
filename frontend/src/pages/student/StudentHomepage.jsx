import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/UserHandle";
import { getSubjectList } from "../../redux/classRelated/classHandle";
import { getAllStudent } from "../../redux/studentRelated/StudentHandle";
import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculate";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import Subject from "../../assets/subject.svg";
import Student from "../../assets/student.png";
import assignments from "../../assets/assignments.svg";
import SeeNotice from "../../components/SeeNotice";
import CustomPieChart from "../../components/CustomPieChart";
import styled from "styled-components";
import CountUp from "react-countup";
import LoadingSpinner from "../../components/LoadingSpinner"; // Import LoadingSpinner component

const StudentHomepage = () => {
  const dispatch = useDispatch();
  const { userDetails, currentUser, loading, response } = useSelector(
    (state) => state.user
  );
  const { subjectList } = useSelector((state) => state.class);
  const { studentsList } = useSelector((state) => state.student);
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const classID = currentUser.className;
  const schoolId = currentUser.school;

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "getStudentDetails"));
    dispatch(getSubjectList(classID, "classSubject"));
    dispatch(getAllStudent("getStudent", schoolId));
  }, [dispatch, currentUser._id, classID, schoolId]);

  const numberOfSubjects = subjectList && subjectList.length;
  const numberOfStudents = studentsList && studentsList.length;

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
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Total Subjects */}
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper elevation={3}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              <img src={Subject} alt="Subjects" width="48" height="48" />
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              Total Subjects
            </Typography>
            <StyledData start={0} end={numberOfSubjects} duration={4} />
          </StyledPaper>
        </Grid>

        {/* Total Assignments */}
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper elevation={3}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              <img src={assignments} alt="Assignment" width="48" height="48" />
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              Total Assignments
            </Typography>
            <StyledData start={0} end={15} duration={4} />
          </StyledPaper>
        </Grid>

        {/* Total Students */}
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper elevation={3}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              <img src={Student} alt="Subjects" width="48" height="48" />
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              Total Students
            </Typography>
            <StyledData start={0} end={numberOfStudents} duration={4} />
          </StyledPaper>
        </Grid>

        {/* Attendance Chart */}
        <Grid item xs={12} md={3} lg={3}>
          <ChartContainer>
            {loading ? (
              <LoadingSpinner /> // Show loading spinner while data is loading
            ) : response ? (
              <Typography variant="h6">No Attendance Found</Typography>
            ) : (
              <>
                {subjectAttendance &&
                Array.isArray(subjectAttendance) &&
                subjectAttendance.length > 0 ? (
                  <CustomPieChart data={chartData} />
                ) : (
                  <Typography variant="h6">No Attendance Found</Typography>
                )}
              </>
            )}
          </ChartContainer>
        </Grid>

        {/* See Notice */}
        <Grid item xs={12}>
          <SeeNotice />
        </Grid>
      </Grid>
    </Container>
  );
};

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StyledData = styled(CountUp)`
  font-size: 2rem;
  font-weight: 600;
  color: #2e7d32;
`;

export default StudentHomepage;
