const { pool } = require("../config/db");

async function createStudent({ studentNumber, fullName, email }) {
  const [result] = await pool.query(
    "INSERT INTO students (student_number, full_name, email) VALUES (?, ?, ?)",
    [studentNumber, fullName, email || null]
  );
  return result.insertId;
}

async function listStudents({ q }) {
  if (q) {
    const like = `%${q}%`;
    const [rows] = await pool.query(
      "SELECT id, student_number, full_name, email FROM students WHERE student_number LIKE ? OR full_name LIKE ? ORDER BY full_name",
      [like, like]
    );
    return rows;
  }
  const [rows] = await pool.query(
    "SELECT id, student_number, full_name, email FROM students ORDER BY full_name"
  );
  return rows;
}

async function findStudentById(id) {
  const [rows] = await pool.query(
    "SELECT id, student_number, full_name, email FROM students WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

module.exports = { createStudent, listStudents, findStudentById };