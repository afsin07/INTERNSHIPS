import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "container dark" : "container light"}>
      <h1>🚀 React Hooks - Day 28</h1>

      {/* Task 1 */}
      <div className="card">
        <h2>Task 1: Name Preview</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h3>
          Hello, {name.trim() ? name : "Guest"}! 👋
        </h3>
      </div>

      {/* Task 2 */}
      <div className="card">
        <h2>Task 2: Theme Toggle</h2>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <p>
          Current Theme:
          <strong>
            {darkMode ? " 🌙 Dark Mode" : " ☀️ Light Mode"}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default App;