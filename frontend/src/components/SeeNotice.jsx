import { useDispatch, useSelector } from "react-redux";
import { getAllNotices } from "../redux/noticeRelated/NoticeHandle";
import TableViewTemplate from "./TableViewTemplate";
import { useEffect } from "react";
import { Paper } from "@mui/material";

const SeeNotice = () => {
  const dispatch = useDispatch();
  const { currentUser, currentRole } = useSelector((state) => state.user);
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );

  useEffect(() => {
    if (currentRole === "Admin") {
      dispatch(getAllNotices(currentUser._id, "notice"));
    } else {
      dispatch(getAllNotices(currentUser.school, "notice"));
    }
  }, [dispatch]);
  if (error) {
    console.error(error);
  }
  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows = noticesList.map((notice) => {
    const date = new Date(notice.data);
    const dateString =
      date.toString() !== "Invalid Date"
        ? date.toISOString().substring(0, 10)
        : "Invalid Date";

    return {
      title: notice.title,
      details: notice.details,
      date: dateString,
      id: notice._id,
    };
  });
  return (
    <div style={{ marginTop: "50px", marginRight: "20px" }}>
      {loading ? (
        <div style={{ fontSize: "20px" }}>Loading...</div>
      ) : response ? (
        <div style={{ fontSize: "20px" }}>No Notices to Show Right Now</div>
      ) : (
        <>
          <h3
            style={{
              fontSize: "30px",
              marginBottom: "40px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Notices
          </h3>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {Array.isArray(noticesList) && noticesList.length > 0 && (
              <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
            )}
          </Paper>
        </>
      )}
    </div>
  );
};

export default SeeNotice;
