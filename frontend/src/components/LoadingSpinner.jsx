import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress size={60} thickness={4.5} />
    </Box>
  );
};

export default LoadingSpinner;
