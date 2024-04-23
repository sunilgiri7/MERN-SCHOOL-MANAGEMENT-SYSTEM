import { ThemeProvider } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loginUser, registerUser } from "../../redux/userRelated/UserHandle";
import { Slide } from "react-awesome-reveal";

const defaultTheme = createTheme();

const AdminRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = "Admin";

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const schoolName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !schoolName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { name, schoolName, email, password };
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "adminName") setAdminNameError(false);
    if (name === "schoolName") setSchoolNameError(false);
    if (name === "rollNumber") setRollNumberError(false);
    if (name === "studentName") setStudentNameError(false);
  };

  useEffect(() => {
    if (
      status === "success" ||
      (currentUser !== null && currentRole === "Admin")
    ) {
      navigate("/Admin/dashboard");
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                Admin Register
              </Typography>
              <Typography variant="h7">
                Create your own school by registering as an admin.
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 2 }}
              >
                {role === "Student" ? (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="rollNumber"
                      label="Enter your Roll Number"
                      name="rollNumber"
                      autoComplete="off"
                      type="number"
                      autoFocus
                      error={rollNumberError}
                      helperText={rollNumberError && "Roll Number is required"}
                      onChange={handleInputChange}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="studentName"
                      label="Enter your name"
                      name="studentName"
                      autoComplete="name"
                      autoFocus
                      error={studentNameError}
                      helperText={studentNameError && "Name is required"}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Enter your name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      error={adminNameError}
                      helperText={adminNameError && "Name is required"}
                      onChange={handleInputChange}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="schoolName"
                      label="Create your school name"
                      name="schoolName"
                      autoComplete="schoolName"
                      error={schoolNameError}
                      helperText={schoolNameError && "School name is required"}
                      onChange={handleInputChange}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Enter your email"
                      autoComplete="email"
                      error={emailError}
                      helperText={emailError && "Email is required"}
                      onChange={handleInputChange}
                    />
                  </>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={toggle ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  error={passwordError}
                  helperText={passwordError && "Password is required"}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setToggle(!toggle)}>
                          {toggle ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: "#7f56da", color: "#fff" }}
                >
                  {loader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Register"
                  )}
                </Button>
                <Grid container sx={{ mt: 2 }}>
                  <Grid>Already have an account?</Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <StyledLink to="/Adminlogin">Log in</StyledLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f2f5",
              padding: "40px",
            }}
          >
            <Slide direction="left" triggerOnce>
              <Box sx={{ maxWidth: "300px", mb: 4 }}>
                <img
                  src="https://res.cloudinary.com/dijtsdohg/image/upload/v1713813235/sbne8czis40eypfi4zaq.svg"
                  alt="Illustration"
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Slide>
            <Slide direction="right" triggerOnce>
              <Typography
                variant="h4"
                sx={{ mb: 2, color: "#2c2143", textAlign: "center" }}
              >
                Discover More
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "#2c2143", textAlign: "center" }}
              >
                Streamline school management, class organization, and add
                students and faculty. Seamlessly track attendance, assess
                performance, and provide feedback. Access records, view marks,
                and communicate effortlessly.
              </Typography>
            </Slide>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#7f56da",
                color: "#fff",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "none",
                },
              }}
              component={Link}
              to="/AdminLogin"
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="primary" />
          Please Wait
        </Backdrop>
      </ThemeProvider>
    </>
  );
};

export default AdminRegister;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
