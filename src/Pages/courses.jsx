import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Courses() {
  const [courses, setCourses] = useState([]);

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("course_code");

    if (error) {
      alert(error.message);
    } else {
      setCourses(data);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("courses").insert([
      {
        course_code: courseCode,
        course_name: courseName,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Course added successfully");

      setCourseCode("");
      setCourseName("");

      fetchCourses();
    }
  };

  const deleteCourse = async (id) => {
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchCourses();
    }
  };

  return (
    <div className="page">
      <h1>Courses</h1>

      <form className="form" onSubmit={addCourse}>
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />

        <button type="submit">Add Course</button>
      </form>

      <h2>Course List</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.course_code}</td>
                <td>{course.course_name}</td>

                <td>
                  <button onClick={() => deleteCourse(course.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courses;