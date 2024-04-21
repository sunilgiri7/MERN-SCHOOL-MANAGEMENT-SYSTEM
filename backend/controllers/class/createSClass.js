const Class = require("../../models/sclassSchema");

const createClass = async (req, res) => {
  try {
    const { className, school } = req.body;
    const createclass = new Class({ className, school });
    const existingClassByName = await Class.findOne({
      className: req.body.className,
      school: req.body.school,
    });
    if (existingClassByName) {
      res.send({ message: "Class already exists" });
    } else {
      const result = await createclass.save();
      res.send(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createClass };
