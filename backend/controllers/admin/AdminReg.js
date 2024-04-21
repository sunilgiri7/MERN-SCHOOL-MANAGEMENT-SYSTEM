const Admin = require("../../models/adminSchema");
const bcrypt = require("bcrypt");

const adminRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const admin = await Admin({
      ...req.body,
      password: hashedPassword,
    });
    const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
    const existingAdminBySchool = await Admin.findOne({
      schoolName: req.body.schoolName,
    });
    if (existingAdminByEmail) {
      res.send({ message: "Admin already exists" });
    } else if (existingAdminBySchool) {
      res.send({ message: "School name already exists" });
    } else {
      let result = await admin.save();
      result.password = undefined;
      res.send(result);
    }
  } catch (error) {
    console.error("Error occurred during admin registration:", error);
  }
};
module.exports = { adminRegister };
