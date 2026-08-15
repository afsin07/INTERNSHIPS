# Day 42 — React + Flask POST API & Form Submission

This project completes the INNOLIFT VENTURES Day 42 tasks.

## What is included

- Flask `POST /api/students` endpoint
- JSON validation for `name`, `email`, and `course`
- `GET /api/students` endpoint for displaying the list
- React controlled form using `useState`
- `onChange` and `onSubmit`
- `event.preventDefault()`
- React `fetch()` POST request
- `Content-Type: application/json`
- Loading state and spinner
- Submit button disabled while loading
- Success and error messages
- Form reset after successful submission
- Newly created student added to the list without page refresh
- CORS enabled for React/Flask development

## Project structure

day-42-react-flask/
├── backend/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
└── README.md

## Requirements

Install:
- Python 3.10+
- Node.js and npm
- Postman (for API testing)

## Step 1 — Run Flask backend

Open a terminal:

```bash
cd backend
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, use Command Prompt:

```cmd
venv\Scripts\activate
```

Install packages:

```bash
python -m pip install -r requirements.txt
```

Start Flask:

```bash
python app.py
```

Backend runs at:

http://127.0.0.1:5000

## Step 2 — Test POST API in Postman

Method:

POST

URL:

http://127.0.0.1:5000/api/students

Headers:

Content-Type: application/json

Body → raw → JSON:

```json
{
  "name": "Afsin",
  "email": "afsin@example.com",
  "course": "AI & Data Science"
}
```

Expected status:

201 Created

Expected response:

```json
{
  "message": "Student created successfully",
  "student": {
    "id": 3,
    "name": "Afsin",
    "email": "afsin@example.com",
    "course": "AI & Data Science"
  }
}
```

To test validation, send an incomplete body such as:

```json
{
  "name": "Afsin",
  "email": ""
}
```

Expected status:

400 Bad Request.

## Step 3 — Run React frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite, normally:

http://localhost:5173

## How the Day 42 flow works

1. User enters name, email, and course.
2. React stores every field with `useState`.
3. `onChange` updates the controlled inputs.
4. `onSubmit` calls `event.preventDefault()`.
5. `loading` becomes `true`.
6. React sends a POST request using `fetch()`.
7. Flask validates the JSON.
8. Flask creates the student record.
9. Flask returns JSON.
10. React adds the returned student to the existing list.
11. React clears the form.
12. `loading` becomes `false`.
13. The list updates without a page refresh.

## Note

Student data is stored in an in-memory Python list for this Day 42 exercise. Restarting Flask resets the list to the two sample students in `app.py`.
