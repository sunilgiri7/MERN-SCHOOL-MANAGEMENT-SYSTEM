const express = require("express");
const router = express.Router();

const {
  createSubject,
  allSubject,
  classSubject,
  getSubjectDetail,
  deleteSubject,
  deleteSubjects,
  deleteSubjectByClass,
} = require("../../controllers/subject/createSubject");

router.post("/createSubject", createSubject);
router.get("/allSubject/:id", allSubject);
router.get("/classSubject/:id", classSubject);
router.get("/getSubjectSubject/:id", getSubjectDetail);
router.post("/deleteSubject/:id", deleteSubject);
router.post("/deleteSubjects/:id", deleteSubjects);
router.post("/deleteSubjectsByClass/:id", deleteSubjectByClass);

module.exports = router;
