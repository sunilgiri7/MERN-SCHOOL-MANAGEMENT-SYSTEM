import { useSelector } from "react-redux";
import "./App.css";
import NotFound from "./pages/NotFound";
import AdminRegister from "./pages/admin/AdminRegister";
import Login from "./pages/auth/Login";
import ChooseUser from "./pages/home/ChooseUser";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

function App() {
  const { currentRole } = useSelector((state) => state.user);
  console.log(currentRole);
  return (
    <div>
      <Router>
        {currentRole === null && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/choose" element={<ChooseUser visitor={"normal"} />} />
            <Route
              path="/chooseguest"
              element={<ChooseUser visitor={"guest"} />}
            />
            <Route path="/AdminLogin" element={<Login role="Admin" />} />
            <Route path="/StudentLogin" element={<Login role="Student" />} />
            <Route path="/TeacherLogin" element={<Login role="Teacher" />} />

            <Route path="/AdminRegister" element={<AdminRegister />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
        {currentRole === "admin" && (
          <>
            <AdminDashboard />
          </>
        )}

        {currentRole === "Student" && (
          <>
            <StudentDashboard />
          </>
        )}

        {currentRole === "Teacher" && (
          <>
            <TeacherDashboard />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
