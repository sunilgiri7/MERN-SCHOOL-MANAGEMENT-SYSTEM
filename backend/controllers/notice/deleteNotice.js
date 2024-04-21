const Notice = require("../../models/noticeSchema");

const deleteNotice = async (req, res) => {
  try {
    const result = await Notice.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNotices = async (req, res) => {
  try {
    const result = await Notice.deleteMany({ school: req.params.id });
    if (result.deletedCount === 0) {
      return res.json({ message: "No notices found to delete" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteNotice, deleteNotices };
