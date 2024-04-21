const Notice = require("../../models/noticeSchema");

const createNotice = async (req, res) => {
  try {
    const { title, details, date, school } = req.body;
    const notice = new Notice({ title, details, date, school });
    const result = await notice.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNotice };
