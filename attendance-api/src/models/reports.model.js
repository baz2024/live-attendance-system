const { pool } = require("../config/db");

async function attendanceByModuleAndRange({ moduleCode, from, to }) {
  const [rows] = await pool.query(
    `SELECT se.module_code, se.title, se.starts_at, se.session_code,
            st.student_number, st.full_name,
            a.checked_in_at, a.status
     FROM sessions se
     LEFT JOIN attendance a ON a.session_id = se.id
     LEFT JOIN students st ON st.id = a.student_id
     WHERE se.module_code = ?
       AND se.starts_at >= ?
       AND se.starts_at < ?
     ORDER BY se.starts_at DESC, st.full_name ASC`,
    [moduleCode, from, to]
  );
  return rows;
}

module.exports = { attendanceByModuleAndRange };