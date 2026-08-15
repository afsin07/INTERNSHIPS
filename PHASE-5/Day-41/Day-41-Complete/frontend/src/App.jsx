import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not connect to the Flask backend.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <h1>Student Information Portal</h1>
          <p>
            React frontend connected to a Flask backend using a REST API.
          </p>
        </div>
        <div className="api-status">
          <span className="status-dot"></span>
          Flask API
        </div>
      </header>

      <main className="content">
        <section className="intro">
          <div>
            <p className="eyebrow">BACKEND DATA</p>
            <h2>Student Records</h2>
            <p>
              The records below are loaded dynamically from
              <code> /api/students </code>.
            </p>
          </div>

          {!loading && !error && (
            <div className="count">
              <strong>{students.length}</strong>
              <span>Students</span>
            </div>
          )}
        </section>

        {loading && (
          <div className="state-card">
            <div className="loader"></div>
            <h3>Loading student data...</h3>
            <p>React is requesting data from Flask.</p>
          </div>
        )}

        {error && (
          <div className="state-card error-card">
            <h3>Backend connection failed</h3>
            <p>{error}</p>
            <p>
              Make sure Flask is running on port 5000.
            </p>
          </div>
        )}

        {!loading && !error && (
          <section className="table-card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <span className="id-pill">#{student.id}</span>
                      </td>
                      <td className="student-name">{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        <span className="course-pill">{student.course}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="flow">
          <h2>How It Works</h2>
          <div className="flow-grid">
            <div className="flow-item">
              <span>01</span>
              <strong>React loads</strong>
              <p><code>useEffect()</code> runs when the component loads.</p>
            </div>
            <div className="flow-item">
              <span>02</span>
              <strong>API request</strong>
              <p><code>fetch()</code> sends a GET request to Flask.</p>
            </div>
            <div className="flow-item">
              <span>03</span>
              <strong>JSON response</strong>
              <p>Flask returns the student records as JSON.</p>
            </div>
            <div className="flow-item">
              <span>04</span>
              <strong>React updates</strong>
              <p><code>useState()</code> stores the data and renders the table.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        React ↔ Flask REST API
      </footer>
    </div>
  );
}

export default App;
