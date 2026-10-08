import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const fetchData = async () => {
    const { data: studentData, error: studentError } = await supabase
      .from("students")
      .select("*")
      .order("name");

    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .order("course_code");

    const { data: attendanceData, error: attendanceError } =
      await supabase
        .from("attendance")
        .select(`
          *,
          students(name, srn),
          courses(course_code, course_name)
        `)
        .order("date", { ascending: false });

    if (studentError || courseError || attendanceError) {
      alert("Error loading attendance data");
      return;
    }

    setStudents(studentData || []);
    setCourses(courseData || []);
    setAttendance(attendanceData || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addAttendance = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("attendance").insert([
      {
        student_id: studentId,
        course_id: courseId,
        date: date || new Date().toISOString().split("T")[0],
        status,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Attendance saved successfully");

      setStudentId("");
      setCourseId("");
      setDate("");
      setStatus("Present");

      fetchData();
    }
  };

  return (
    <div className="page">
      <h1>Attendance</h1>

      <form className="form" onSubmit={addAttendance}>
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} - {student.srn}
            </option>
          ))}
        </select>

        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        >
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_code} - {course.course_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">Save Attendance</button>
      </form>

      <h2>Attendance Records</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>SRN</th>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((record) => (
              <tr key={record.id}>
                <td>{record.students?.name}</td>
                <td>{record.students?.srn}</td>
                <td>{record.courses?.course_code}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;