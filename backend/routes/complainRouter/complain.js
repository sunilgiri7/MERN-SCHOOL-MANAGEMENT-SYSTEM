const express = require("express");
const router = express.Router();
const { createComplain } = require("../../controllers/complain/addComplain");
const { complainList } = require("../../controllers/complain/complainList");

router.post("/createComplain", createComplain);
router.get("/complainList/:id", complainList);
module.exports = router;
