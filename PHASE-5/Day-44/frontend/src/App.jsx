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
    setFetchingStudents(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load students.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unable to load students.");
      }

      setStudents(data);
    } catch (err) {
      console.error(err);
      setStudents([]);
      setError(err.message || "Unable to load students.");
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

    setLoading(true);
    setMessage("");
    setError("");

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
        throw new Error(data.message || "Unable to save student");
      }

      setMessage(data.message);

      setStudents((previousStudents) => [
        ...previousStudents,
        data.student
      ]);

      setForm({
        name: "",
        email: "",
        course: ""
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to save student");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <p className="tag">INNOLIFT VENTURES • DAY 44</p>
          <h1>Student Management</h1>
          <p>React → Flask API → MySQL</p>
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
            <h2>Students from MySQL</h2>
            <span className="count">{students.length}</span>
          </div>

          {fetchingStudents ? (
            <div className="state-message">
              <span className="spinner dark"></span>
              Loading students...
            </div>
          ) : error && students.length === 0 ? (
            <div className="state-message error-state">
              <strong>{error}</strong>
              <button className="retry" onClick={loadStudents}>
                Retry
              </button>
            </div>
          ) : students.length === 0 ? (
            <div className="empty-state">
              <strong>No students found.</strong>
              <p>The database currently contains no student records.</p>
            </div>
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
                    <span>
                      ID: {student.id} • {student.course}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="flow-card">
          <h2>Database Flow</h2>
          <div className="flow">
            <span>React</span>
            <b>→</b>
            <span>Flask API</span>
            <b>→</b>
            <span>MySQL</span>
          </div>
          <p>
            Student records are stored persistently in MySQL instead of an
            in-memory Python list.
          </p>
        </section>
      </div>
    </div>
  );
}

export default App;
