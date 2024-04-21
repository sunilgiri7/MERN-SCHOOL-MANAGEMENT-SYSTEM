const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Server is ready!");
});

const adminRoutes = require("./routes/adminRouter/admin.js");
app.use("/admin-routes", adminRoutes);

const teacherRoutes = require("./routes/teacherRouter/teacherReg.js");
app.use("/teacher-routes", teacherRoutes);

const studentRoutes = require("./routes/studentRouter/student.js");
app.use("/student-routes", studentRoutes);

const subjectRoutes = require("./routes/subjectRouter/subject.js");
app.use("/subject-routes", subjectRoutes);

const complainRoutes = require("./routes/complainRouter/complain.js");
app.use("/complain-routes", complainRoutes);

const noticeRoutes = require("./routes/noticeRouter/Notice.js");
app.use("/notice-routes", noticeRoutes);

const classRoutes = require("./routes/classRouter/sclass.js");
app.use("/class-routes", classRoutes);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
