const { pool } = require("../config/db");

async function checkIn({ sessionId, studentId, status }) {
  try {
    const [result] = await pool.query(
      "INSERT INTO attendance (session_id, student_id, checked_in_at, status) VALUES (?, ?, NOW(), ?)",
      [sessionId, studentId, status || "PRESENT"]
    );
    return { inserted: true, id: result.insertId };
  } catch (e) {
    if (e && e.code === "ER_DUP_ENTRY") {
      return { inserted: false, already: true };
    }
    throw e;
  }
}

async function listAttendanceForSession(sessionId) {
  const [rows] = await pool.query(
    `SELECT a.checked_in_at, a.status,
            s.student_number, s.full_name, s.email
     FROM attendance a
     JOIN students s ON s.id = a.student_id
     WHERE a.session_id = ?
     ORDER BY a.checked_in_at ASC`,
    [sessionId]
  );
  return rows;
}

async function countAttendanceForSession(sessionId) {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS count FROM attendance WHERE session_id = ?",
    [sessionId]
  );
  return rows[0].count;
}

module.exports = { checkIn, listAttendanceForSession, countAttendanceForSession };