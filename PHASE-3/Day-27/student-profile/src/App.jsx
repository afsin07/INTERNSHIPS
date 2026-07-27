import StudentProfile from "./components/StudentProfile";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Student Profiles
      </h1>

      <StudentProfile
        image="https://via.placeholder.com/150"
        name="Afsin Noor"
        department="Artificial Intelligence & Data Science"
        year="II Year"
        skills="Python, React, Machine Learning"
      />

      <StudentProfile
        image="https://via.placeholder.com/150"
        name="Rahul Sharma"
        department="Computer Science"
        year="III Year"
        skills="Java, React, SQL"
      />

      <StudentProfile
        image="https://via.placeholder.com/150"
        name="Priya Singh"
        department="Information Technology"
        year="I Year"
        skills="HTML, CSS, JavaScript"
      />
    </div>
  );
}

export default App;