const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      ref: "Teacher",
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    teachingSubject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
    },
    teachingClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sclass",
      required: true,
    },
    attendance: [
      {
        date: {
          type: Date,
          required: true,
        },
        persentCount: {
          type: String,
        },
        absentCount: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("teacher", teacherSchema);
