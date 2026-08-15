from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/students", methods=["GET"])
def get_students():
    students = [
        {
            "id": 1,
            "name": "Arun Kumar",
            "email": "arun@example.com",
            "course": "AI & Data Science"
        },
        {
            "id": 2,
            "name": "Priya Sharma",
            "email": "priya@example.com",
            "course": "Computer Science"
        },
        {
            "id": 3,
            "name": "Rahul Kumar",
            "email": "rahul@example.com",
            "course": "Information Technology"
        },
        {
            "id": 4,
            "name": "Sneha Raj",
            "email": "sneha@example.com",
            "course": "Artificial Intelligence"
        },
        {
            "id": 5,
            "name": "Vijay Anand",
            "email": "vijay@example.com",
            "course": "Data Science"
        }
    ]
    return jsonify(students)

@app.route("/")
def home():
    return jsonify({
        "message": "Day 41 Flask backend is running",
        "api": "/api/students"
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
