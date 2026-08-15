# API Response & Frontend-Backend Practice

This project extends the React + Flask application with comprehensive API request handling.

## Requirements covered

### Task 01 — Error Handling
- `try...catch` around API requests
- `response.ok` checked for GET and POST
- Error message displayed in the UI
- GET loading state stopped in `finally`
- POST loading state stopped in `finally`
- If Flask is unavailable, the UI displays: **Unable to load students.**
- A Retry button is provided after a GET failure

### Task 02 — Empty Data
- Handles a successful API response containing `[]`
- Does not display an empty student list
- Displays: **No students found.**
- Includes instructions below for testing the empty state

### Task 03 — Complete Full Flow
- GET students when React loads
- Display students
- Fill the React form
- Submit the form
- POST to Flask
- Flask validates name, email, and course
- Flask returns JSON
- React shows a success message
- React adds the new student without refreshing the page
- Error case can be tested by stopping Flask

## Project structure

api-response-practice/
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

## 1. Start Flask

Open a terminal in VS Code:

```powershell
cd backend
python -m venv venv
```

Activate the environment on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

Start Flask:

```powershell
python app.py
```

Backend:

http://127.0.0.1:5000

## 2. Start React

Open a second VS Code terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend:

http://localhost:5173

## 3. Test the successful flow

1. Start Flask.
2. Start React.
3. Open the React URL.
4. Verify the five students appear.
5. Fill in Name, Email, and Course.
6. Click Add Student.
7. Verify `Saving...` appears briefly.
8. Verify the success message.
9. Verify the form clears.
10. Verify the new student appears without refreshing.

## 4. Test Task 01 — Backend failure

1. Start React while Flask is running so the frontend loads.
2. Stop the Flask terminal with `Ctrl + C`.
3. Refresh the React page.
4. The UI should show:

**Unable to load students.**

The loading indicator should also stop because the request is handled by `try...catch...finally`.

You can restart Flask and click **Retry**.

## 5. Test Task 02 — Empty state

Open `backend/app.py`.

Temporarily change:

```python
students = [
    ...
]
```

to:

```python
students = []
```

Restart Flask and refresh React.

The UI should show:

**No students found.**

After taking your screenshot, restore the original five students.

## 6. Test POST validation

With Flask running, submit the form normally.

The HTML form uses required fields, and Flask also validates the JSON body.

You can additionally test the API directly in Thunder Client:

POST:

http://127.0.0.1:5000/api/students

JSON:

```json
{
  "name": "",
  "email": "",
  "course": ""
}
```

Expected status: `400 Bad Request`

Expected error:

```json
{
  "error": "name, email, and course are required"
}
```

## 7. What happens when Submit is clicked?

React prevents the normal browser form submission, sets `loading` to true, and sends a JSON POST request with `fetch()`. Flask receives and validates the JSON, creates a student, and returns a JSON response. React checks `response.ok`, reads the JSON response, adds the returned student to its state, clears the form, displays the success message, and finally stops the loading state. The browser page is not refreshed.

## Note

Student records are stored in an in-memory Python list for this internship exercise. Restarting Flask resets the list to the five sample students.
