const { pool } = require("../config/db");

async function createSession({ moduleCode, title, startsAt, sessionCode, createdByUserId }) {
  const [result] = await pool.query(
    "INSERT INTO sessions (module_code, title, starts_at, session_code, created_by_user_id) VALUES (?, ?, ?, ?, ?)",
    [moduleCode, title, startsAt, sessionCode, createdByUserId]
  );
  return result.insertId;
}

async function getSessionByCode(sessionCode) {
  const [rows] = await pool.query(
    "SELECT id, module_code, title, starts_at, ends_at, status, session_code FROM sessions WHERE session_code = ?",
    [sessionCode]
  );
  return rows[0] || null;
}

async function getSessionById(sessionId) {
  const [rows] = await pool.query(
    "SELECT id, module_code, title, starts_at, ends_at, status, session_code FROM sessions WHERE id = ?",
    [sessionId]
  );
  return rows[0] || null;
}

async function closeSession(sessionId) {
  const [result] = await pool.query(
    "UPDATE sessions SET status='CLOSED', ends_at=NOW() WHERE id = ?",
    [sessionId]
  );
  return result.affectedRows;
}

async function listSessions({ moduleCode }) {
  if (moduleCode) {
    const [rows] = await pool.query(
      "SELECT id, module_code, title, starts_at, ends_at, status, session_code FROM sessions WHERE module_code=? ORDER BY starts_at DESC",
      [moduleCode]
    );
    return rows;
  }
  const [rows] = await pool.query(
    "SELECT id, module_code, title, starts_at, ends_at, status, session_code FROM sessions ORDER BY starts_at DESC"
  );
  return rows;
}

module.exports = { createSession, getSessionByCode, getSessionById, closeSession, listSessions };