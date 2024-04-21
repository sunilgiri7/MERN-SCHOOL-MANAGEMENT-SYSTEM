import "./App.css";
import ChooseUser from "./pages/home/ChooseUser";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choose" element={<ChooseUser />} />
          <Route path="/chooseguest" element={<ChooseUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
