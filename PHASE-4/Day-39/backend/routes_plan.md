# MediPredict API Routes Plan

This document outlines all routes implemented in the **MediPredict** application, detailing HTTP method, path, authentication requirement, request body shape, and response shape.

---

## 1. Public Pages

| Method | Path | Auth Requirement | Purpose / Content Served |
| ------ | ---- | ---------------- | ------------------------ |
| `GET` | `/` | `public` | Serves main landing page (`index.html`) |
| `GET` | `/login.html` | `public` | Serves user login & registration page (`login.html`) |
| `GET` | `/api/health` | `public` | Returns server health status `{ status: "running", project: "MediPredict", day: 39 }` |

---

## 2. Protected Pages

| Method | Path | Auth Requirement | Request / Cookie | Response / Redirect |
| ------ | ---- | ---------------- | ---------------- | ------------------- |
| `GET` | `/dashboard.html` | `pageLoginRequired` | Session cookie (`connect.sid`) | Serves `dashboard.html` if authenticated; redirects to `/login.html` if unauthenticated |
| `GET` | `/health-form.html` | `pageLoginRequired` | Session cookie (`connect.sid`) | Serves `health-form.html` if authenticated; redirects to `/login.html` if unauthenticated |
| `GET` | `/report.html` | `pageLoginRequired` | Session cookie (`connect.sid`) | Serves `report.html` if authenticated; redirects to `/login.html` if unauthenticated |
| `GET` | `/admin.html` | `adminLoginRequired` | Session cookie (`connect.sid`) | Serves `admin.html` if user has admin privileges; redirects to `/login.html` if unauthenticated |

---

## 3. Auth API

### `POST /api/register`
* **Auth Requirement**: `public`
* **Request Body Shape**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```
* **Success Response Shape** (201 Created):
  ```json
  {
    "success": true,
    "message": "Registration successful",
    "userId": 1
  }
  ```
* **Error Response Shape** (400 Bad Request / 500 Server Error):
  ```json
  {
    "success": false,
    "message": "An account with this email already exists."
  }
  ```

### `POST /api/login`
* **Auth Requirement**: `public`
* **Request Body Shape**:
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```
* **Success Response Shape** (200 OK):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
* **Error Response Shape** (401 Unauthorized):
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

### `POST /api/logout`
* **Auth Requirement**: `loginRequired`
* **Request Body Shape**: None (`{}`)
* **Success Response Shape** (200 OK):
  ```json
  {
    "success": true,
    "message": "Logout successful"
  }
  ```

### `GET /api/session`
* **Auth Requirement**: `public` (Session state inspector)
* **Request Body Shape**: None
* **Success Response Shape** (200 OK when logged in):
  ```json
  {
    "success": true,
    "loggedIn": true,
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
* **Unauthenticated Response Shape** (401 Unauthorized):
  ```json
  {
    "success": false,
    "loggedIn": false,
    "message": "No active session"
  }
  ```

### `GET /api/me`
* **Auth Requirement**: `loginRequired`
* **Request Body Shape**: None
* **Success Response Shape** (200 OK):
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

---

## 4. Reports API (CRUD)

### `POST /api/reports`
* **Auth Requirement**: `loginRequired`
* **Request Body Shape**:
  ```json
  {
    "report": {
      "date": "2026-08-09T14:00:00.000Z",
      "answers": {
        "bloodPressure": "normal",
        "bloodSugar": "normal",
        "sleepHours": 7,
        "stressLevel": 4,
        "smoking": "no",
        "alcohol": "no",
        "activity": "active",
        "diet": "balanced",
        "existingConditions": ["none"],
        "symptoms": ["fatigue"]
      },
      "conditions": [
        { "name": "Stress / Sleep Imbalance", "percent": 30 }
      ],
      "topCondition": "Stress / Sleep Imbalance",
      "riskLevel": "Low",
      "healthScore": 88,
      "recommendations": [
        "No significant symptom patterns detected — keep up your current routine."
      ]
    }
  }
  ```
* **Success Response Shape** (201 Created):
  ```json
  {
    "success": true,
    "message": "Report created successfully",
    "id": 12
  }
  ```

### `GET /api/reports`
* **Auth Requirement**: `loginRequired`
* **Request Body Shape**: None
* **Success Response Shape** (200 OK):
  ```json
  {
    "success": true,
    "reports": [
      {
        "id": 12,
        "date": "2026-08-09T14:00:00.000Z",
        "answers": { ... },
        "conditions": [ ... ],
        "topCondition": "Stress / Sleep Imbalance",
        "riskLevel": "Low",
        "healthScore": 88,
        "recommendations": [ ... ]
      }
    ]
  }
  ```

### `GET /api/reports/:id`
* **Auth Requirement**: `loginRequired`
* **Request Body Shape**: None
* **Success Response Shape** (200 OK):
  ```json
  {
    "success": true,
    "report": {
      "id": 12,
      "date": "2026-08-09T14:00:00.000Z",
      "answers": { ... },
      "conditions": [ ... ],
      "topCondition": "Stress / Sleep Imbalance",
      "riskLevel": "Low",
      "healthScore": 88,
      "recommendations": [ ... ]
    }
  }
  ```

### `PUT /api/reports/:id`
* **Auth Requirement**: `loginRequired`
* **Request Body Shape**: Same as `POST /api/reports`
* **Success Response Shape** (200 OK):
  ```json
  {
    "success": true,
    "message": "Report updated successfully"
  }
  ```

### `DELETE /api/reports/:id`
* **Auth Requirement**: `loginRequired`
* **Request Body Shape**: None
* **Success Response Shape** (200 OK):
  ```json
  {
    "success": true,
    "message": "Report deleted successfully"
  }
  ```

---

## 5. Admin API

### `GET /api/admin/users` (and `/api/users`)
* **Auth Requirement**: `adminLoginRequired` / `loginRequired`
* **Request Body Shape**: None
* **Success Response Shape** (200 OK):
  ```json
  {
    "success": true,
    "count": 5,
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "password": "$2b$10$...",
        "created_at": "2026-08-09T05:47:38.000Z"
      }
    ]
  }
  ```
