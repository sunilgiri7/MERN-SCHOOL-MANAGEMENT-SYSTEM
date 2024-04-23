import React from "react";
import { Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </Typography>
        <Box mt={4}>
          <Typography variant="body1">
            Go back to{" "}
            <Link to="/" style={{ textDecoration: "none", color: "#3f51b5" }}>
              Home
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
