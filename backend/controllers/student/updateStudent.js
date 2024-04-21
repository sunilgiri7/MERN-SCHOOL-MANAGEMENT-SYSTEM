const Student = require("../../models/studentSchema");
const bcrypt = require("bcrypt");

const updateStudent = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    let result = await Student.findByIdAndUpdate(
      req.params.id,
      {
        set$: req.body,
      },
      { new: true }
    );
    result.password = undefined;
    res.send(result);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
};
