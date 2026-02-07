# Attendance API (Node.js + Express + MySQL + JWT)

This folder contains the backend API for the Live Attendance system.

## 1) Requirements

- Node.js (LTS recommended)
- MySQL (local or hosted)
- Git

## 2) Install dependencies

From the **API folder**:

```bash
npm install
```

## 3) Create your `.env` file

Create a file named **`.env`** in the API folder (same level as `app.js` / `server.js`, depending on your repo).

Use this template:

```env
# Server
PORT=5050

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=attendance_db
DB_PORT=3306

# Auth
JWT_SECRET=change_me_to_a_long_random_secret
JWT_EXPIRES_IN=2h

# CORS (React dev server)
CORS_ORIGIN=http://localhost:5173
```

### Notes
- **Never commit `.env`** to GitHub.
- If your MySQL runs on a different port/user, update the values above.

## 4) Run the API

```bash
npm run dev
```

or (if your project uses plain node)

```bash
node server.js
```

You should see the API listening on the configured port.

Test health:

```bash
curl http://localhost:5050/health
```

Expected:

```json
{ "ok": true, "message": "Attendance API running" }
```

## 5) Key endpoints students will use

### Auth

#### Student self-registration (public)
`POST /api/auth/register-student`

Body (JSON):
```json
{
  "email": "student@tudublin.ie",
  "password": "Password123!",
  "studentNumber": "C12345678",
  "fullName": "Student Name"
}
```

#### Login (public)
`POST /api/auth/login`

Body (JSON):
```json
{
  "email": "student@tudublin.ie",
  "password": "Password123!"
}
```

Response contains a JWT token:
```json
{ "ok": true, "token": "eyJ..." }
```

> The frontend stores this token in `localStorage` and sends it as:
> `Authorization: Bearer <token>`.

### Attendance / Sessions (protected)
These require `Authorization: Bearer <JWT>`.

Examples:
- `POST /api/sessions` (LECTURER role)
- `GET /api/sessions` (LECTURER role)
- `POST /api/attendance/checkin` (STUDENT role)
- `GET /api/attendance/live/:sessionId` (LECTURER role)

## 6) Troubleshooting

### 404 Not Found on an endpoint
- Confirm you are calling the correct URL and port.
- Confirm the route exists in `routes/*.routes.js`.
- Restart the server after changes.

### 400 Validation failed
- Your JSON keys must match the schema exactly.
- For `/api/auth/register-student` you MUST send:
  `email`, `password`, `studentNumber`, `fullName`.

### 401 Unauthorized / Invalid token
- Login again to get a fresh token.
- Ensure requests include the `Authorization: Bearer <token>` header.

### CORS errors in browser
- Ensure `.env` has `CORS_ORIGIN=http://localhost:5173`
- Restart the API after changing `.env`.

---
