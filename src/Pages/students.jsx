import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Students() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [srn, setSrn] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [gpa, setGpa] = useState("");

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setStudents(data);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("students").insert([
      {
        name,
        srn,
        email,
        department,
        semester: Number(semester),
        gpa: Number(gpa),
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Student added successfully");

      setName("");
      setSrn("");
      setEmail("");
      setDepartment("");
      setSemester("");
      setGpa("");

      fetchStudents();
    }
  };

  const deleteStudent = async (id) => {
    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchStudents();
    }
  };

  return (
    <div className="page">
      <h1>Students</h1>

      <form className="form" onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="SRN"
          value={srn}
          onChange={(e) => setSrn(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="GPA"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      <h2>Student List</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>SRN</th>
              <th>Email</th>
              <th>Department</th>
              <th>Semester</th>
              <th>GPA</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.srn}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.semester}</td>
                <td>{student.gpa}</td>

                <td>
                  <button onClick={() => deleteStudent(student.id)}>
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

export default Students;