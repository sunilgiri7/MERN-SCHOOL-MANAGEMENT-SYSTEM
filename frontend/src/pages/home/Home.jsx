import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import schoolImg from "../../assets/Designer.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Image Section (50%) */}
        <Grid item xs={12} sm={6}>
          <img
            src={schoolImg}
            alt="School Management System"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        {/* Login Section (50%) */}
        <Grid
          item
          xs={12}
          sm={6}
          container
          direction="column"
          alignItems="center"
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            style={{ fontFamily: "Arial", fontWeight: "bold", color: "#333" }}
          >
            School Management System
          </Typography>
          <Grid item>
            <Typography
              variant="body1"
              align="center"
              paragraph
              style={{ fontFamily: "Arial", fontSize: "1.2rem", color: "#666" }}
            >
              Elevate your school's efficiency with our School Management
              System. Organize classes, track attendance, and empower
              communication effortlessly. Streamline operations and unleash the
              full potential of your institution.
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  marginBottom: "1rem",
                  width: "100%",
                  fontFamily: "Arial",
                  fontSize: "1rem",
                }}
                component={Link}
                to="/chooseguest"
              >
                Login as guest
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginBottom: "1rem",
                  width: "100%",
                  fontFamily: "Arial",
                  fontSize: "1rem",
                }}
                component={Link}
                to="/choose"
              >
                Login
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              align="center"
              style={{ fontFamily: "Arial", fontSize: "0.9rem", color: "#888" }}
            >
              Don't have an account?{" "}
              <a
                href="/Adminregister"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Signup here
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
