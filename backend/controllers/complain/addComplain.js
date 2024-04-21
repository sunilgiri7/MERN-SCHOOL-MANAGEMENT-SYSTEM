const Complain = require("../../models/complainSchema");

const createComplain = async (req, res) => {
  try {
    const { user, date, complaint, school } = req.body;
    const newComplain = new Complain({ user, date, complaint, school });
    const savedComplain = await newComplain.save();
    res.status(201).json(savedComplain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createComplain };
