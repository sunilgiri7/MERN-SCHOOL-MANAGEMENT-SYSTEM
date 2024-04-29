import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudent } from "../../redux/studentRelated/StudentHandle";
import { getAllclasses } from "../../redux/classRelated/classHandle";
import { getAllTeachers } from "../../redux/teacherRelated/teacherHandle";
import student from "../../assets/student.png";
import teacher from "../../assets/teacher.png";
import classes from "../../assets/class.png";
import fees from "../../assets/fees.png";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import CountUp from "react-countup";
import styled from "styled-components";
import SeeNotice from "../../components/SeeNotice";
const AdminHomepage = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { classesList } = useSelector((state) => state.class);
  const { teacherList } = useSelector((state) => state.teacher);

  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudent(adminID));
    dispatch(getAllclasses(adminID));
    dispatch(getAllTeachers(adminID));
  }, [adminID, dispatch]);

  const numberOfStudents = studentsList && studentsList.length;
  const numberOfClasses = classesList && classesList.length;
  const numberOfTeachers = teacherList && teacherList.length;
  // console.log(numberOfStudents);
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper elevation={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                <img src={student} alt="student" width="48" height={48} />
              </Box>
              <Typography variant="h6" align="center" gutterBottom>
                Total Students
              </Typography>
              <StyledData start={0} end={numberOfStudents} duration={4} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper elevation={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                <img src={classes} alt="class" width="48" height={48} />
              </Box>
              <Typography variant="h6" align="center" gutterBottom>
                Total Classes
              </Typography>
              <StyledData start={0} end={numberOfClasses} duration={4} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper elevation={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                <img src={teacher} alt="teacher" width="48" height={48} />
              </Box>
              <Typography variant="h6" align="center" gutterBottom>
                Total Teachers
              </Typography>
              <StyledData start={0} end={numberOfTeachers} duration={4} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper elevation={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                <img src={fees} alt="fees" width="48" height={48} />
              </Box>
              <Typography variant="h6" align="center" gutterBottom>
                Fees Collection
              </Typography>
              <StyledData start={0} end={11200} duration={4} prefix="$" />
            </StyledPaper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <SeeNotice />
        </Grid>
      </Container>
    </>
  );
};

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

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default AdminHomepage;
