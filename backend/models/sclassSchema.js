const mongoose = require("mongoose");

const sclassSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("sclass", sclassSchema);
