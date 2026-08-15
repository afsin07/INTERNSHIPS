CREATE DATABASE IF NOT EXISTS student_management;

USE student_management;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    course VARCHAR(100) NOT NULL
);

INSERT INTO students (name, email, course) VALUES
('Arun Kumar', 'arun@example.com', 'AI & Data Science'),
('Priya S', 'priya@example.com', 'Computer Science'),
('Rahul M', 'rahul@example.com', 'Information Technology'),
('Sneha R', 'sneha@example.com', 'Data Science'),
('Vijay K', 'vijay@example.com', 'Artificial Intelligence');
