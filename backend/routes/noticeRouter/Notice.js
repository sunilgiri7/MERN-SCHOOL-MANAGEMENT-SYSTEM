const express = require("express");
const router = express.Router();
const { createNotice } = require("../../controllers/notice/addNotice");
const { noticeList } = require("../../controllers/notice/noticeList");
const { updateNotice } = require("../../controllers/notice/updateNotice");
const {
  deleteNotice,
  deleteNotices,
} = require("../../controllers/notice/deleteNotice");

router.post("/createNotice", createNotice);
router.get("/noticeList/:id", noticeList);
router.put("/updateNotice/:id", updateNotice);
router.post("/deleteNotice/:id", deleteNotice);
router.post("/deleteNotices/:id", deleteNotices);

module.exports = router;
