import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:5000/api/students";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      setFetchingStudents(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Could not load students.");
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchingStudents(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create student.");
      }

      setStudents((previousStudents) => [
        ...previousStudents,
        data.student
      ]);

      setMessage(data.message);

      setForm({
        name: "",
        email: "",
        course: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <h1>Student Registration</h1>
        </header>

        <section className="card">
          <h2>Add Student</h2>

          <form onSubmit={handleSubmit}>
            <label>
              Student Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </label>

            <label>
              Course
              <input
                type="text"
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="Enter course"
                required
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="button-content">
                  <span className="spinner"></span>
                  Saving...
                </span>
              ) : (
                "Add Student"
              )}
            </button>
          </form>

          {message && <div className="success">{message}</div>}
          {error && <div className="error">{error}</div>}
        </section>

        <section className="card">
          <div className="list-header">
            <h2>Students</h2>
            <span className="count">{students.length}</span>
          </div>

          {fetchingStudents ? (
            <div className="loading-list">
              <span className="spinner dark"></span>
              Loading students...
            </div>
          ) : students.length === 0 ? (
            <p className="empty">No students found.</p>
          ) : (
            <div className="student-list">
              {students.map((student) => (
                <div className="student" key={student.id}>
                  <div className="avatar">
                    {student.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="student-info">
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                    <span>{student.course}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
