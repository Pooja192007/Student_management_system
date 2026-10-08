import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Students from "./Pages/students";
import Attendance from "./Pages/Attendence";
import Courses from "./Pages/courses";
import AcademicRecords from "./Pages/AcademicRecords";

import { supabase } from "./supabase";

function AppContent() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!session && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {session && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={session ? <Navigate to="/" /> : <Login />}
        />

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