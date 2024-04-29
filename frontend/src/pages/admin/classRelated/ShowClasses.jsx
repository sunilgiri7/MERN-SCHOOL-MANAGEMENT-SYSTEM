import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllclasses } from "../../../redux/classRelated/classHandle";
import { deleteUser } from "../../../redux/userRelated/UserHandle";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
  ListItemIcon,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCardIcon from "@mui/icons-material/AddCard";
import styled from "styled-components";
import SpeedDialIcon from "../../../components/SpeedDialTemplate";
import TableViewTemplate from "../../../components/TableViewTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classesList, loading, getresponse } = useSelector(
    (state) => state.class
  );
  const { currentUser } = useSelector((state) => state.user);
  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllclasses(adminID));
  }, [dispatch, adminID]);

  const [message, setMessage] = useState("");
  const [action, setAction] = useState(null);
  const open = Boolean(action);

  const deleteHandler = () => {
    setMessage("Sorry the delete function has been disabled for now.");
    dispatch(deleteUser());
    // dispatch(deleteUser(adminID, address))
  };

  const classColumns = [{ id: "name", label: "Class Name", minWidth: 170 }];

  const classRows =
    classesList &&
    classesList.length > 0 &&
    classesList.map((classItem) => {
      return {
        name: classItem.className,
        id: classItem._id,
      };
    });

  const classButtonHaver = ({ row }) => {
    const actions = [
      {
        icon: <PostAddIcon />,
        name: "Add Subjects",
        action: () => navigate("Admin/addSubject/" + row.id),
      },
      {
        icon: <PersonAddAlt1Icon />,
        name: "Add Student",
        action: () => navigate("/Admin/class/addstudents/" + row.id),
      },
    ];
    return (
      <ButtonContainer>
        <IconButton onClick={deleteHandler} color="secondary">
          <DeleteIcon color="error" />
        </IconButton>
        <Button
          variant="contained"
          onClick={() => navigate("/Admin/classes/class/" + row.id)}
        >
          View
        </Button>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const handleClick = (event) => {
      setAction(event.currentTarget);
    };

    const handleClose = () => {
      setAction(null);
    };

    return (
      <>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Add Students & Subjects">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "action-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <h5>Add</h5>
              <SpeedDialIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={action}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {actions.map((action, index) => (
            <MenuItem key={index} onClick={action.action}>
              <ListItemIcon fontSize="small">{action.icon}</ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: "Add New Class",
      action: () => navigate("Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Classes",
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/Admin/addClass")}
              >
                Add Class
              </Button>
            </Box>
          ) : (
            <>
              {Array.isArray(classesList) && classesList.length > 0 && (
                <TableViewTemplate
                  buttonHaver={classButtonHaver}
                  columns={classColumns}
                  rows={classRows}
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}
    </>
  );
};

const styles = {
  styledPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export default ShowClasses;
