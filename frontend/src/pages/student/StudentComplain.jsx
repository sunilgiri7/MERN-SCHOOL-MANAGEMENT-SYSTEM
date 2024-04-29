import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStuffs } from "../../redux/userRelated/UserHandle";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const StudentComplain = () => {
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { status, currentUser, error } = useSelector((state) => state.user);

  const user = currentUser._id;
  const school = currentUser.school;
  const address = "Complain";

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fields = { user, date, complaint, school };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuffs(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      setLoader(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("Complaint submitted successfully.");
      setSnackbarOpen(true);
      setComplaint("");
      setDate("");
    } else if (error) {
      setLoader(false);
      setSnackbarSeverity("error");
      setSnackbarMessage("Network Error");
      setSnackbarOpen(true);
    }
  }, [status, error]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          backgroundColor: "background.paper",
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Complain
        </Typography>
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Select Date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Write Your Complain"
            variant="outlined"
            value={complaint}
            onChange={(event) => setComplaint(event.target.value)}
            required
            multiline
            rows={4}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loader}
            sx={{ mt: 3 }}
          >
            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentComplain;
