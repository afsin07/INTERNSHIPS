# Day 41 – Connecting Frontend to Backend

This project completes the four Day 41 internship tasks.

## Tasks Completed

1. API Flow Documentation
2. Flask `GET /api/students`
3. React connection using `fetch()`, `useEffect()`, `response.json()`, and `useState()`
4. Dynamic student table populated only from the Flask API

## Run the Backend

Open a terminal in the `backend` folder:

```powershell
pip install -r requirements.txt
python app.py
```

Test the API in a browser:

```text
http://127.0.0.1:5000/api/students
```

You should see five student records in JSON.

## Run the Frontend

Open a second terminal in the `frontend` folder:

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:5173/
```

Keep both terminals running.

## Important

The React code does not contain a hardcoded student array. Student records are requested from `/api/students` and stored in React state.

## Day 41 Flow

React → `useEffect()` → `fetch()` → Flask API → JSON → `response.json()` → `useState()` → Student Table
