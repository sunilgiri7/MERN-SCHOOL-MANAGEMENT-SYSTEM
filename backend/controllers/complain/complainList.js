const Complain = require("../../models/complainSchema");

const complainList = async (req, res) => {
  try {
    const complains = await Complain.find({ school: req.params.id }).populate(
      "user",
      "name"
    );
    if (complains.length === 0) {
      // Check if no complaints were found
      return res.status(404).json({ message: "No complaints found" });
    }
    res.json(complains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { complainList };
