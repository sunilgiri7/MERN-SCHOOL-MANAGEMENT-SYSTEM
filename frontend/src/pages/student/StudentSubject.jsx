import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/UserHandle";
import {
  getClassDetails,
  getSubjectList,
} from "../../redux/classRelated/classHandle";

import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TableChartIcon from "@mui/icons-material/TableChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import CustomBarChart from "../../components/CustomBarChart";

import LoadingSpinner from "../../components/LoadingSpinner";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    minHeight: "calc(100vh - 64px - 56px)", // Adjust for fixed bottom nav height
  },
}));

const StudentSubject = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { subjectList, classDetails } = useSelector((state) => state.class);

  const { userDetails, currentUser, loading, response, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "getStudentDetails"));
  }, [dispatch, currentUser._id]);

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks.length === 0 && currentUser.className) {
      dispatch(getSubjectList(currentUser.className, "classSubject"));
      dispatch(getClassDetails(currentUser.className, "getclassdetail"));
    }
  }, [subjectMarks, dispatch, currentUser.className]);

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Student Dashboard
      </Typography>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={4} justify="center">
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              {subjectMarks && subjectMarks.length > 0 ? (
                <>
                  {selectedSection === "table" && (
                    <TableSection subjectMarks={subjectMarks} />
                  )}
                  {selectedSection === "chart" && (
                    <ChartSection subjectMarks={subjectMarks} />
                  )}
                  <BottomNavigation
                    value={selectedSection}
                    onChange={handleSectionChange}
                    showLabels
                    style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                  >
                    <BottomNavigationAction
                      label="Table"
                      value="table"
                      icon={
                        selectedSection === "table" ? (
                          <TableChartIcon />
                        ) : (
                          <TableChartOutlinedIcon />
                        )
                      }
                    />
                    <BottomNavigationAction
                      label="Chart"
                      value="chart"
                      icon={
                        selectedSection === "chart" ? (
                          <InsertChartIcon />
                        ) : (
                          <InsertChartOutlinedIcon />
                        )
                      }
                    />
                  </BottomNavigation>
                </>
              ) : (
                <ClassDetails
                  classDetails={classDetails}
                  subjectList={subjectList}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const TableSection = ({ subjectMarks }) => {
  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Subject Marks
      </Typography>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell>Marks</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {subjectMarks.map((result, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{result.subName.subName}</StyledTableCell>
              <StyledTableCell>{result.marksObtained}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const ChartSection = ({ subjectMarks }) => {
  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Subject Wise Performance
      </Typography>
      <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
    </>
  );
};

export default StudentSubject;
