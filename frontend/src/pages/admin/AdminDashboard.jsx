import {
  Box,
  CssBaseline,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Logout from "../auth/Logout";
// import SideBar from "../components/SideBar"; // Import your SideBar component
// import AccountMenu from "../components/AccountMenu"; // Import your AccountMenu component

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
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
              Admin Dashboard
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
          <List component="nav">{/* <SideBar /> */}</List>
        </Drawer>
        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
      <Logout />
    </>
  );
};

export default AdminDashboard;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    marginLeft: "240px", // Add this line to create space for the drawer
  },
  drawerStyled: {
    width: 240, // Set the width of the drawer
    flexShrink: 0,
  },
  hideDrawer: {
    display: "none", // Hide the drawer when closed
  },
  toolBarStyled: {
    px: 2, // Add some padding to the toolbar
  },
};
