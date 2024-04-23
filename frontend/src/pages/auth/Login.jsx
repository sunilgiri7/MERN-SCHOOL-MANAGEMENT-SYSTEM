import { ThemeProvider } from "@emotion/react";
import { LinkRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  ButtonBase,
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
  colors,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../model/PopUp";
import styled from "styled-components";
import { loginUser } from "../../redux/userRelated/UserHandle";
import { Slide } from "react-awesome-reveal";

const defaultTheme = createTheme();

const Login = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === "Student") {
      const rollNum = event.target.rollNumber.value;
      const studentName = event.target.studentName.value;
      const password = event.target.password.value;
      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fileds = (rollNum, studentName, password);
      setLoader(true);
      dispatch(loginUser(fileds, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;
      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };
  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "roleNumber") setRoleNumberError(false);
    if (name === "studentName") setStudentNameError(false);
  };
  const guestModeHandler = () => {
    const password = "sunil1";
    if (role === "Admin") {
      const email = "thisissunil7@gmail.com";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Student") {
      const rollNum = "1";
      const studentName = "Aaryasha Giri";
      const fields = { rollNum, studentName, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Teacher") {
      const email = "elon@gmail.com";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    }
  };
  useEffect(() => {
    if (status === "success" || currentUser != null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard");
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard");
      }
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);
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
                Login
              </Typography>
              <Typography variant="h7">
                Welcome back! Please enter your details
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
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter your email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={emailError}
                    helperText={emailError && "Email is required"}
                    onChange={handleInputChange}
                  />
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
                  <Link href="#">Forgot password?</Link>
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
                    "Login"
                  )}
                </Button>
                <Button
                  fullWidth
                  onClick={guestModeHandler}
                  variant="outlined"
                  sx={{
                    mt: 2,
                    mb: 3,
                    color: "#7f56da",
                    borderColor: "#7f56da",
                  }}
                >
                  Login as Guest
                </Button>
                {role === "Admin" && (
                  <Grid container>
                    <Grid>Don't have an account?</Grid>
                    <Grid item sx={{ ml: 2 }}>
                      <Link to="/Adminregister">Sign up</Link>
                    </Grid>
                  </Grid>
                )}
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
            {role === "Admin" && (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  alignSelf: "center",
                  backgroundColor: "#7f56da",
                  color: "#fff",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              >
                <Link
                  to="/Adminregister"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Button>
            )}
          </Grid>
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={guestLoader}
        >
          <CircularProgress color="primary" />
          Please Wait
        </Backdrop>
        {/* <Popup
          message={message}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        /> */}
      </ThemeProvider>
    </>
  );
};

export default Login;
