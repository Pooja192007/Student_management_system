import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Students from "./Pages/students";
import Attendance from "./Pages/Attendence";
import Courses from "./Pages/courses";
import AcademicRecords from "./Pages/AcademicRecords";

function AppContent() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/academic-records"
          element={<AcademicRecords />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;