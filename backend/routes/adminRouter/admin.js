const express = require("express");
const router = express.Router();
const { adminRegister } = require("../../controllers/admin/AdminReg");
const { adminLogin } = require("../../controllers/admin/AdminLogin");
const { getAdminDetails } = require("../../controllers/admin/AdminDetails");

router.post("/AdminReg", adminRegister);
router.post("/Adminlog", adminLogin);
router.post("/Admindetail/:id", getAdminDetails);

module.exports = router;
