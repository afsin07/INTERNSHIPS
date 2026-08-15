from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

students = [
    {"id": 1, "name": "Arun Kumar", "email": "arun@example.com", "course": "AI & Data Science"},
    {"id": 2, "name": "Priya S", "email": "priya@example.com", "course": "Computer Science"}
]

@app.get("/api/students")
def get_students():
    return jsonify(students), 200

@app.post("/api/students")
def create_student():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Request body must contain JSON data"}), 400

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    course = str(data.get("course", "")).strip()

    if not name or not email or not course:
        return jsonify({
            "error": "name, email, and course are required"
        }), 400

    student = {
        "id": max([s["id"] for s in students], default=0) + 1,
        "name": name,
        "email": email,
        "course": course
    }

    students.append(student)

    return jsonify({
        "message": "Student created successfully",
        "student": student
    }), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)
