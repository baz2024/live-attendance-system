# Attendance Frontend (React + Vite + Material UI)

This folder contains the React frontend for the Live Attendance system.

## 1) Requirements

- Node.js (LTS recommended)
- Backend API running (see `README_API.md`)
- Git

## 2) Install dependencies

From the **frontend folder**:

```bash
npm install
```

## 3) Create your `.env` file

Create a file named **`.env`** in the frontend root (same level as `package.json`).

Use this template:

```env
VITE_API_BASE_URL=http://localhost:5050
```

### Notes
- Vite only loads environment variables at startup.
  If you change `.env`, stop and run `npm run dev` again.
- **Never commit `.env`** to GitHub.

## 4) Run the frontend

```bash
npm run dev
```

Vite will print the local URL, usually:

- http://localhost:5173

## 5) App routes (what to open)

- `/login` — Login page
- `/register/student` — Student registration page
- `/lecturer` — Lecturer dashboard (requires LECTURER JWT)
- `/student/checkin` — Student check-in page (requires login)

## 6) Student workflow

1. Go to: `/register/student`
2. Register with:
   - Email
   - Full Name
   - Student Number
   - Password
3. App auto-logs in and sends you to:
   - `/student/checkin`

## 7) Lecturer workflow

1. Lecturer logs in at `/login`
2. Lecturer creates session in `/lecturer`
3. Students check in using the session code

## 8) Troubleshooting

### API calls fail / wrong URL
Check your frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:5050
```

Then restart:

```bash
npm run dev
```

### 400 Validation failed on student registration
Your backend expects these **exact** fields:

- `email`
- `password`
- `studentNumber`
- `fullName`

### 401 Unauthorized
- Log in again (token may be missing/expired).
- Check browser storage:
  DevTools → Application → Local Storage → `token`

### CORS error in browser
- Ensure backend `.env` has:
  `CORS_ORIGIN=http://localhost:5173`
- Restart the backend.

---
