import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/UserHandle";
import { getSubjectList } from "../../redux/classRelated/classHandle";
import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculate";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Subject from "../../assets/subject.png";
import assignments from "../../assets/assignments.png";
import SeeNotice from "../../components/SeeNotice";
import CustomPieChart from "../../components/CustomPieChart";
import styled from "styled-components";

const StudentHomepage = () => {
  const dispatch = useDispatch();
  const { userDetails, currentUser, loading, response } = useSelector(
    (state) => state.user
  );
  console.log(userDetails.attendance);
  //   console.log(currentUser);
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
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <Paper>
              <img src={Subject} alt="Subjects" />
              <Typography variant="h6">Total Subjects</Typography>
              <Typography variant="body1">{numberOfSubjects}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Paper>
              <img src={assignments} alt="Assignment" />
              <Typography variant="h6">Total Assignments</Typography>
              <Typography variant="body1"></Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            {/* ChartContainer component is missing */}
            <ChartContainer>
              {response ? (
                <Typography variant="h6">No Attendance Found</Typography>
              ) : (
                <>
                  {loading ? (
                    <Typography variant="h6">Loading...</Typography>
                  ) : (
                    <>
                      {subjectAttendance &&
                      Array.isArray(subjectAttendance) &&
                      subjectAttendance.length > 0 ? (
                        <>
                          {/* CustomPieChart component is missing */}
                          <CustomPieChart data={chartData} />
                        </>
                      ) : (
                        <Typography variant="h6">
                          No Attendance Found
                        </Typography>
                      )}
                    </>
                  )}
                </>
              )}
            </ChartContainer>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SeeNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

export default StudentHomepage;
