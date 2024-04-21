const express = require("express");
const router = express.Router();
const { createClass } = require("../../controllers/class/createSClass");
const {
  classList,
  getClassDetail,
  getClassStudents,
} = require("../../controllers/class/classList");
const {
  deleteClass,
  deleteClasses,
} = require("../../controllers/class/deleteClass");

router.post("/createclass", createClass);
router.get("/getclasslist/:id", classList);
router.get("/getclassdetail/:id", getClassDetail);
router.get("/getclassstudent/:id", getClassStudents);
router.post("/deleteclass/:id", deleteClass);
router.post("/deleteclasses/:id", deleteClasses);
module.exports = router;
