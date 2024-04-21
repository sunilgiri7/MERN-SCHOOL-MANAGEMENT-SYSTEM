const Admin = require("../../models/adminSchema");

const getAdminDetails = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.password = undefined;
      res.send(admin);
    } else {
      res.send({ message: "No Admin found" });
    }
  } catch (error) {
    res.status(500).json(err);
  }
};
module.exports = { getAdminDetails };
