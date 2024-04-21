import React from "react";
import { Grid, Container, Paper, Typography, Box } from "@mui/material";
import { AccountCircle, School, Group } from "@mui/icons-material";
import "./choose.css";
import { styled } from "@mui/material/styles";

const ChooseUser = ({ navigateHandler }) => {
  const Container = styled("div")({
    background: "linear-gradient(to bottom, #1e88e5, #1565c0)",
    height: "120vh",
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
  });
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <div onClick={() => navigateHandler("Admin")}>
            <Paper elevation={3}>
              <Box mb={2}>
                <AccountCircle fontSize="large" />
              </Box>
              <Typography variant="h6">Admin</Typography>
              <Typography variant="body2">
                Login as an administrator to access the dashboard to manage app
                data.
              </Typography>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            onClick={() => {
              navigateHandler("Student");
            }}
          >
            <Paper elevation={3}>
              <Box mb={2}>
                <School fontSize="large" />
              </Box>
              <Typography variant="h6">Student</Typography>{" "}
              {/* Corrected here */}
              <Typography variant="body2">
                Login as a student to explore course materials and assignments.
              </Typography>{" "}
              {/* Corrected here */}
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <div onClick={() => navigateHandler("Teacher")}>
              <Box mb={2}>
                <Group fontSize="large" />
              </Box>
              <Typography variant="h6">Teacher</Typography>{" "}
              {/* Corrected here */}
              <Typography variant="body2">
                Login as a teacher to create courses, assignments, and track
                student progress.
              </Typography>{" "}
              {/* Corrected here */}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChooseUser;
