import os

import mysql.connector
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from mysql.connector import Error, IntegrityError

load_dotenv()

app = Flask(__name__)
CORS(app)


def get_db_connection():
    """Create a MySQL connection using environment variables."""
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME", "student_management"),
    )


@app.get("/api/students")
def get_students():
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            "SELECT id, name, email, course "
            "FROM students ORDER BY id"
        )
        students = cursor.fetchall()

        return jsonify(students), 200

    except Error as error:
        print("GET database error:", error)
        return jsonify({
            "success": False,
            "message": "Unable to load students"
        }), 500

    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None and connection.is_connected():
            connection.close()


@app.post("/api/students")
def create_student():
    connection = None
    cursor = None

    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "success": False,
                "message": "Request body must contain JSON data"
            }), 400

        name = str(data.get("name", "")).strip()
        email = str(data.get("email", "")).strip()
        course = str(data.get("course", "")).strip()

        if not name or not email or not course:
            return jsonify({
                "success": False,
                "message": "Name, email, and course are required"
            }), 400

        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Duplicate email is prevented by the UNIQUE constraint in MySQL.
        insert_query = """
            INSERT INTO students (name, email, course)
            VALUES (%s, %s, %s)
        """
        cursor.execute(insert_query, (name, email, course))
        connection.commit()

        new_id = cursor.lastrowid

        cursor.execute(
            "SELECT id, name, email, course FROM students WHERE id = %s",
            (new_id,)
        )
        student = cursor.fetchone()

        return jsonify({
            "success": True,
            "message": "Student created successfully",
            "student": student
        }), 201

    except IntegrityError as error:
        if connection is not None:
            connection.rollback()

        print("Integrity error:", error)
        return jsonify({
            "success": False,
            "message": "Email already exists. Please use a different email."
        }), 409

    except Error as error:
        if connection is not None:
            connection.rollback()

        print("POST database error:", error)
        return jsonify({
            "success": False,
            "message": "Unable to save student"
        }), 500

    except Exception as error:
        if connection is not None:
            connection.rollback()

        print("Unexpected error:", error)
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred"
        }), 500

    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None and connection.is_connected():
            connection.close()


if __name__ == "__main__":
    app.run(debug=True, port=5000)
