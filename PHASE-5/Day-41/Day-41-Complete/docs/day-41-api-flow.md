# Day 41 – API Flow Documentation

## Purpose of `/api/students`

The `/api/students` endpoint is a Flask REST API endpoint used to provide student information from the backend to the React frontend. It accepts a GET request and returns student records in JSON format.

## What is an HTTP Request?

An HTTP request is a message sent by a client, such as a browser or React application, to a server to request or exchange data.

In this project, React sends:

`GET /api/students`

## What is a JSON Response?

A JSON response is data returned by the backend in JavaScript Object Notation format.

## How Data Travels from Flask Backend to React Frontend

1. React component loads.
2. `useEffect()` runs.
3. React uses `fetch()` to send a GET request to `/api/students`.
4. Vite forwards the `/api` request to the Flask server during development.
5. Flask processes the `/api/students` endpoint.
6. Flask returns student records as JSON.
7. React receives the response.
8. `response.json()` converts the response to JavaScript data.
9. `useState()` stores the received records.
10. React renders the table using the received state.

## API/Data Flow Architecture

```text
+-----------------------+
|    React Frontend     |
|                       |
|      useEffect()      |
|        fetch()        |
+-----------+-----------+
            |
            | GET /api/students
            v
+-----------------------+
|    Vite Dev Server    |
|      Proxy /api       |
+-----------+-----------+
            |
            v
+-----------------------+
|     Flask Backend     |
|   /api/students       |
+-----------+-----------+
            |
            | JSON Response
            v
+-----------------------+
|    React Frontend     |
|                       |
|   response.json()     |
|          |            |
|          v            |
|      useState()       |
+-----------+-----------+
            |
            v
+-----------------------+
|       React UI        |
|    Student Table      |
+-----------------------+
```

## Complete Workflow

Flask API → JSON Response → React `fetch()` → `response.json()` → `useState()` → React UI
