import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function AcademicRecords() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [records, setRecords] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [credits, setCredits] = useState("");

  const fetchData = async () => {
    const { data: studentData } = await supabase
      .from("students")
      .select("*")
      .order("name");

    const { data: courseData } = await supabase
      .from("courses")
      .select("*")
      .order("course_code");

    const { data: recordData, error } = await supabase
      .from("academic_records")
      .select(`
        *,
        students(name, srn),
        courses(course_code, course_name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setStudents(studentData || []);
    setCourses(courseData || []);
    setRecords(recordData || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addRecord = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("academic_records").insert([
      {
        student_id: studentId,
        course_id: courseId,
        marks: Number(marks),
        grade,
        credits: Number(credits),
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Academic record saved successfully");

      setStudentId("");
      setCourseId("");
      setMarks("");
      setGrade("");
      setCredits("");

      fetchData();
    }
  };

  return (
    <div className="page">
      <h1>Academic Records</h1>

      <form className="form" onSubmit={addRecord}>
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
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          required
        />

        <button type="submit">Save Record</button>
      </form>

      <h2>Academic Records List</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>SRN</th>
              <th>Course</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Credits</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.students?.name}</td>
                <td>{record.students?.srn}</td>
                <td>{record.courses?.course_code}</td>
                <td>{record.marks}</td>
                <td>{record.grade}</td>
                <td>{record.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AcademicRecords;