const Admin = require("../../models/adminSchema");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    let admin = await Admin.findOne({ email: email });
    if (admin) {
      if (password === admin.password) {
        admin.password = undefined;
        res.send(admin);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  } else {
    res.send({ message: "Email and password are required" });
  }
};
module.exports = { adminLogin };
