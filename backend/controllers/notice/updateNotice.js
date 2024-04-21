const Notice = require("../../models/noticeSchema");

const updateNotice = async (req, res) => {
  try {
    const result = await Notice.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateNotice };
