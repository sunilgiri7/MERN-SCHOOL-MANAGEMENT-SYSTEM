import React, { useState } from "react";
import { Grid, Paper, Typography, Box, Backdrop } from "@mui/material";
import { AccountCircle, School, Group } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const ChooseUser = ({ visitor }) => {
  const [loader, setLoader] = useState(false);
  const password = "zxc";
  const navigate = useNavigate();

  const ContainerStyled = styled("div")({
    background: "teal",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
  });

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "sunilgiri@1";
        const fields = { email, password };
        setLoader(true);
        // Simulate async operation
        setTimeout(() => {
          setLoader(false);
        }, 2000); // Replace 2000 with your desired loading time
      } else {
        navigate("/AdminLogin");
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNo = "1";
        const studentName = "Aaryasha Giri";
        const fields = { rollNo, studentName, password };
        setLoader(true);
        // Simulate async operation
        setTimeout(() => {
          setLoader(false);
        }, 2000); // Replace 2000 with your desired loading time
      } else {
        navigate("/StudentLogin");
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "elon@1";
        const fields = { email, password };
        setLoader(true);
        // Simulate async operation
        setTimeout(() => {
          setLoader(false);
        }, 2000); // Replace 2000 with your desired loading time
      } else {
        navigate("/TeacherLogin");
      }
    }
  };

  return (
    <>
      <ContainerStyled>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "white",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#008080",
                    color: "#FFFFFF",
                  },
                }}
              >
                <Box mb={2}>
                  <AccountCircle fontSize="large" sx={{ color: "black" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: "10px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Admin
                </Typography>
                <Typography variant="body2" sx={{ color: "black" }}>
                  Login as an administrator to access the dashboard to manage
                  app data.
                </Typography>
              </Paper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Student")}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "white",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#008080",
                    color: "#FFFFFF",
                  },
                }}
              >
                <Box mb={2}>
                  <School fontSize="large" sx={{ color: "black" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: "10px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Student
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "black",
                  }}
                >
                  Login as a student to explore course materials and
                  assignments.
                </Typography>
              </Paper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Teacher")}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "white",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#008080",
                    color: "#FFFFFF",
                  },
                }}
              >
                <Box mb={2}>
                  <Group fontSize="large" sx={{ color: "black" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: "10px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Teacher
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "black",
                  }}
                >
                  Login as a teacher to create courses, assignments, and track
                  student progress.
                </Typography>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </ContainerStyled>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      />
    </>
  );
};

export default ChooseUser;
