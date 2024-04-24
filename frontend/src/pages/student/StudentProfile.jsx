import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Container,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const className = currentUser.className;
  const studentSchool = currentUser.school;

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <ProfileHeader>
          <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
            {String(currentUser.name).charAt(0)}
          </Avatar>
          <Typography variant="h5" component="h2" textAlign="center">
            {currentUser.name}
          </Typography>
          <Typography variant="subtitle1" component="p" textAlign="center">
            Student Roll No: {currentUser.rollNum}
          </Typography>
        </ProfileHeader>
        <ProfileDetails>
          <Typography variant="subtitle1" component="p">
            <strong>Class:</strong> {className.className}
          </Typography>
          <Typography variant="subtitle1" component="p">
            <strong>School:</strong> {studentSchool.schoolName}
          </Typography>
        </ProfileDetails>
      </StyledPaper>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Date of Birth:</strong> January 1, 2000
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Gender:</strong> Male
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Email:</strong> john.doe@example.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Phone:</strong> (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Address:</strong> 123 Main Street, City, Country
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Emergency Contact:</strong> (987) 654-3210
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;

const ProfileHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileDetails = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  & > * {
    flex: 1;
    margin: 0 10px;
  }
`;
