import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Student Management System</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/academic-records">Academic Records</Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;