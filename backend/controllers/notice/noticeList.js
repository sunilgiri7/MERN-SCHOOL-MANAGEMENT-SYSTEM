const Notice = require("../../models/noticeSchema");

const noticeList = async (req, res) => {
  try {
    const notices = await Notice.find({ school: req.params.id });
    if (notices.length > 0) {
      res.json(notices);
    } else {
      res.status(404).json({ message: "Notice not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { noticeList };
