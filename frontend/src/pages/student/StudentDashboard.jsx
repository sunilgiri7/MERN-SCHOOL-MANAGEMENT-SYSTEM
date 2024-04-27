import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Toolbar,
  // AppBar,
  IconButton,
  Typography,
  // Drawer,
  Divider,
  List,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AppBar, Drawer } from "../../components/styles";
import Logout from "../auth/Logout";
import Sidebar from "./StudentSidebar";
import StudentProfile from "./StudentProfile";
import StudentHomepage from "./StudentHomepage";
import StudentSubject from "./StudentSubject";
import StudentAttendance from "./StudentAttendance";

const StudentDashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{ backgroundColor: "#7f56da" }}
        >
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Student Dashboard
            </Typography>
            {/* <AccountMenu /> */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={open ? styles.drawerStyled : styles.hideDrawer}
        >
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Sidebar />
          </List>
        </Drawer>
        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<StudentHomepage />} />
            <Route path="Student/profile" element={<StudentProfile />} />
            <Route path="/Student/profile" element={<StudentProfile />} />

            <Route path="/Student/subjects" element={<StudentSubject />} />
            <Route path="Student/attendance" element={<StudentAttendance />} />
            <Route path="/logout" element={<Logout />} />

            {/* Add more routes for other pages */}
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default StudentDashboard;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },
  drawerStyled: {
    display: "flex",
  },
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
