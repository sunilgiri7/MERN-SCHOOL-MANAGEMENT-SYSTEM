import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { underControl } from "../redux/userRelated/UserSlice";
import { underStudentControl } from "../redux/studentRelated/studentSlice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MyComponent() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleClick = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    // Dispatch actions to reset state
    dispatch(underControl());
    dispatch(underStudentControl());
  };

  return (
    <div>
      <Button onClick={() => handleClick("success", "Operation successful")}>
        Show Success
      </Button>
      <Button onClick={() => handleClick("error", "Operation failed")}>
        Show Error
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
